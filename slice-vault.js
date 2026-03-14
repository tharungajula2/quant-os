#!/usr/bin/env node

/**
 * slice-vault.js
 * ──────────────
 * Parses a monolithic Markdown file (brain/deep-research-report.md) into
 * individual note files inside brain/, fixing frontmatter delimiters.
 *
 * Usage:  node slice-vault.js
 *
 * What it does:
 *  1. Reads brain/deep-research-report.md
 *  2. Splits on the `# File: <name>.md` header pattern
 *  3. For each block, extracts the filename & wraps metadata in proper --- delimiters
 *  4. Writes each note as brain/<name>.md
 *  5. Renames the original to _deep-research-report.bak
 */

const fs = require("fs");
const path = require("path");

// ─── Config ───────────────────────────────────────────────────────────
const BRAIN_DIR = path.join(__dirname, "brain");
const SOURCE_FILE = path.join(BRAIN_DIR, "deep-research-report.md");
const BACKUP_FILE = path.join(BRAIN_DIR, "_deep-research-report.bak");

// Known frontmatter keys we expect (order preserved in output)
const FM_KEYS = ["title", "date", "tags", "cluster"];

// ─── Guards ───────────────────────────────────────────────────────────
if (!fs.existsSync(SOURCE_FILE)) {
  console.error(`❌  Source file not found: ${SOURCE_FILE}`);
  process.exit(1);
}

// ─── Read & Split ─────────────────────────────────────────────────────
const raw = fs.readFileSync(SOURCE_FILE, "utf-8");

// Split on lines starting with `# File: ` (with or without leading whitespace)
// Each match produces a block that starts with `# File: <name>.md`
const HEADER_RE = /^#\s+File:\s+(.+\.md)\s*$/gm;

const blocks = [];
let match;
const headerPositions = [];

while ((match = HEADER_RE.exec(raw)) !== null) {
  headerPositions.push({
    index: match.index,
    filename: match[1].trim(),
  });
}

if (headerPositions.length === 0) {
  console.error("❌  No '# File: <name>.md' headers found in the source file.");
  process.exit(1);
}

// Slice raw text into blocks between consecutive headers
for (let i = 0; i < headerPositions.length; i++) {
  const start = headerPositions[i].index;
  const end =
    i + 1 < headerPositions.length ? headerPositions[i + 1].index : raw.length;
  blocks.push({
    filename: headerPositions[i].filename,
    text: raw.slice(start, end).trim(),
  });
}

console.log(`\n📄  Found ${blocks.length} note blocks in source file.\n`);

// ─── Process Each Block ───────────────────────────────────────────────
let created = 0;
let skipped = 0;

for (const block of blocks) {
  const { filename, text } = block;

  // Remove the `# File: <name>.md` header line itself
  const lines = text.split(/\r?\n/);
  const bodyLines = lines.slice(1); // drop the header line

  // Find frontmatter: look for the pair of --- delimiters
  // The pattern in this file is:
  //   ---                 (line 0 of bodyLines, possibly after blank lines)
  //   title: "..."
  //   date: ...
  //   tags: [...]
  //   cluster: ...
  //   ---
  //   <content>

  let fmStart = -1;
  let fmEnd = -1;

  for (let i = 0; i < bodyLines.length; i++) {
    const trimmed = bodyLines[i].trim();
    if (trimmed === "---") {
      if (fmStart === -1) {
        fmStart = i;
      } else {
        fmEnd = i;
        break;
      }
    }
  }

  let frontmatter = "";
  let content = "";

  if (fmStart !== -1 && fmEnd !== -1 && fmEnd > fmStart) {
    // We found both delimiters — extract the metadata lines between them
    const fmLines = bodyLines.slice(fmStart + 1, fmEnd);
    frontmatter = "---\n" + fmLines.join("\n") + "\n---";

    // Everything after the closing --- is the body content
    const afterFm = bodyLines.slice(fmEnd + 1);

    // Strip any leading/trailing section separator `---` from the body
    // (the source uses --- as section dividers between notes)
    content = afterFm
      .join("\n")
      .replace(/\n---\s*$/, "") // trailing ---
      .trim();
  } else {
    // No proper --- delimiters found — try to extract metadata lines manually
    // Look for lines starting with known keys
    const metaLines = [];
    let bodyStart = 0;

    for (let i = 0; i < bodyLines.length; i++) {
      const trimmed = bodyLines[i].trim();
      if (trimmed === "" || trimmed === "---") continue;

      const isMetaLine = FM_KEYS.some(
        (k) => trimmed.startsWith(k + ":") || trimmed.startsWith(k + " :")
      );

      if (isMetaLine) {
        metaLines.push(trimmed);
      } else {
        bodyStart = i;
        break;
      }
    }

    if (metaLines.length > 0) {
      frontmatter = "---\n" + metaLines.join("\n") + "\n---";
    }

    content = bodyLines
      .slice(bodyStart)
      .join("\n")
      .replace(/\n---\s*$/, "")
      .trim();
  }

  // ── Assemble final file ──
  const finalContent = frontmatter
    ? frontmatter + "\n\n" + content + "\n"
    : content + "\n";

  // ── Write ──
  const outPath = path.join(BRAIN_DIR, filename);

  // Safety: don't overwrite existing files (like test-node.md)
  if (fs.existsSync(outPath)) {
    console.log(`⏭️   Skipped (already exists): ${filename}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(outPath, finalContent, "utf-8");
  console.log(`✅  Created: ${filename}`);
  created++;
}

// ─── Backup Original ──────────────────────────────────────────────────
if (created > 0) {
  fs.renameSync(SOURCE_FILE, BACKUP_FILE);
  console.log(`\n🔒  Original renamed to: _deep-research-report.bak`);
}

// ─── Summary ──────────────────────────────────────────────────────────
console.log(`
───────────────────────────────
  ✅  Created:  ${created} files
  ⏭️   Skipped:  ${skipped} files
  📂  Output:   ${BRAIN_DIR}
───────────────────────────────
`);
