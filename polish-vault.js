#!/usr/bin/env node

/**
 * polish-vault.js
 * ────────────────
 * Iterates every .md file in brain/ and applies formatting cleanups
 * so notes render perfectly in both Obsidian and Next.js (remark-math).
 *
 * Usage:  node polish-vault.js
 */

const fs = require("fs");
const path = require("path");

const BRAIN_DIR = path.join(__dirname, "brain");

// ─── Guards ───────────────────────────────────────────────────────────
if (!fs.existsSync(BRAIN_DIR)) {
  console.error("❌  brain/ directory not found.");
  process.exit(1);
}

const files = fs
  .readdirSync(BRAIN_DIR)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

if (files.length === 0) {
  console.log("⚠️  No .md files found in brain/.");
  process.exit(0);
}

console.log(`\n🔧  Polishing ${files.length} files in brain/\n`);

let totalFixes = 0;

for (const filename of files) {
  const filepath = path.join(BRAIN_DIR, filename);
  const original = fs.readFileSync(filepath, "utf-8");
  let text = original;
  let fixes = 0;

  // ── 1. Strip hallucinated AI citations ──────────────────────────────
  //    Patterns:  【1†L119-L128】  【42†L244-L252】  【anything】
  const beforeCite = text;
  text = text.replace(/【[^】]*】/g, "");
  if (text !== beforeCite) fixes++;

  //    Also remove bracket-style [xyz+...] citation ghosts like [1], [2†source]
  //    But preserve valid markdown links [text](url) and wikilinks [[...]]
  //    Only strip patterns like [12†L...] or [nn] that look like citations
  const beforeBracketCite = text;
  text = text.replace(/\[(\d+(?:†[^\]]*)?)\](?!\()/g, "");
  if (text !== beforeBracketCite) fixes++;

  // ── 2. Fix display math spacing ─────────────────────────────────────
  //    Ensure $$ blocks have blank lines before and after them
  //    Match $$ that starts a line (display math opener/closer)
  const beforeMath = text;

  // Add blank line BEFORE $$ if there isn't one
  text = text.replace(/([^\n])\n(\$\$)/g, "$1\n\n$2");

  // Add blank line AFTER $$ if there isn't one  
  text = text.replace(/(\$\$)\n([^\n$])/g, "$1\n\n$2");

  if (text !== beforeMath) fixes++;

  // ── 3. Fix code block spacing ───────────────────────────────────────
  //    Ensure ``` blocks have blank lines before and after
  const beforeCode = text;

  // Blank line before opening ```
  text = text.replace(/([^\n])\n(```\w*)/g, "$1\n\n$2");

  // Blank line after closing ```
  text = text.replace(/(```)\n([^\n`])/g, "$1\n\n$2");

  if (text !== beforeCode) fixes++;

  // ── 4. Collapse excessive blank lines ───────────────────────────────
  //    Replace 3+ consecutive blank lines with exactly 2
  const beforeBlanks = text;
  text = text.replace(/\n{4,}/g, "\n\n\n");
  if (text !== beforeBlanks) fixes++;

  // ── 5. Clean up trailing whitespace on lines ────────────────────────
  const beforeTrail = text;
  text = text.replace(/[ \t]+$/gm, "");
  if (text !== beforeTrail) fixes++;

  // ── 6. Ensure file ends with exactly one newline ────────────────────
  text = text.trimEnd() + "\n";

  // ── Write back if changed ───────────────────────────────────────────
  if (text !== original) {
    fs.writeFileSync(filepath, text, "utf-8");
    console.log(`  ✅  ${filename}  (${fixes} fix${fixes !== 1 ? "es" : ""})`);
    totalFixes += fixes;
  } else {
    console.log(`  ─   ${filename}  (no changes)`);
  }
}

console.log(`
───────────────────────────────
  📂  Files scanned:  ${files.length}
  🔧  Files fixed:    ${totalFixes > 0 ? "yes" : "none"}
  📍  Directory:      ${BRAIN_DIR}
───────────────────────────────
`);
