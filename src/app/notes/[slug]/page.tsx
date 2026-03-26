import { MDXRemote } from "next-mdx-remote/rsc";
import { getNoteBySlug, getBacklinks } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/* ── Plugins ── */
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

/* ── KaTeX CSS ── */
import "katex/dist/katex.min.css";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const [note, backlinks] = await Promise.all([
    getNoteBySlug(slug),
    getBacklinks(slug),
  ]);

  if (!note) notFound();

  const { frontmatter, content } = note;
  const tags: string[] = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];

  // ── Safeguard MDX compilation & Clean Redundant Title ──
  // 1. Remove the first "# Title" from the MDX content to prevent double titles.
  // We use a non-global replace to ensure only the first H1 is removed.
  const contentWithoutHeader = content.replace(/#\s+[^\n]+/, "");
  
  // 2. MDX will crash if it sees "<0", "<1", etc. (treats as JSX)
  const safeContent = contentWithoutHeader.replace(/<(\d)/g, '< $1');

  return (
    <div
      className="selection:bg-cyan-500/30"
      style={{ color: "var(--text-primary)" }}
    >
      <div
        style={{
          maxWidth: "56rem",  /* Expanded reading width */
          margin: "0 auto",
          padding: "3rem 1.5rem",
          width: "100%",
        }}
      >
        {/* ── Back link ── */}
        <Link
          href="/"
          className="group inline-flex items-center gap-[0.4rem] mb-12 text-[0.8rem] font-medium tracking-[0.03em] no-underline transition-all duration-200"
          style={{
            color: "rgba(34, 211, 238, 0.4)",
          }}
        >
          <style>{`
            .group:hover { color: var(--accent) !important; }
          `}</style>
          <ArrowLeft
            size={14}
            style={{ transition: "transform 0.2s ease" }}
            className="group-hover:-translate-x-0.5"
          />
          Back to Network
        </Link>

        {/* ══════════════════════════════════════════════════════════════
            PROPERTIES PANEL — Obsidian-style metadata block
            ══════════════════════════════════════════════════════════════ */}
        <div
          className="glass-card"
          style={{
            marginBottom: "2.5rem",
            padding: "2rem",
            borderRadius: "1rem",
            background: "rgba(2, 4, 12, 0.8)", /* Much darker void background */
            borderColor: "rgba(34, 211, 238, 0.1)",
          }}
        >
          {/* ── Individual Mastery Progress Bar ── */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.7rem", color: "rgba(34, 211, 238, 0.4)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>
                Reading Sync
              </span>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.9)", fontWeight: 700, letterSpacing: "0.05em" }}>
                {frontmatter.progress || 0}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "rgba(34, 211, 238, 0.05)",
                borderRadius: "999px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.04)"
              }}
            >
                <div
                style={{
                  height: "100%",
                  width: `${frontmatter.progress || 0}%`,
                  background: "linear-gradient(90deg, rgba(34, 211, 238, 0.4), var(--accent), #fff)",
                  boxShadow: "0 0 12px var(--accent-glow)",
                  transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
                  borderRadius: "999px",
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h1
            className="heading-gradient"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {frontmatter.title ?? slug}
          </h1>

          {/* Metadata rows */}
          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {/* Cluster */}
            {frontmatter.cluster && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, minWidth: "4rem" }}>
                  Cluster
                </span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.15rem 0.6rem",
                    borderRadius: "999px",
                    border: `1px solid ${
                      frontmatter.cluster === "03 — Portfolio Projects" 
                        ? "rgba(34, 211, 238, 0.25)" 
                        : frontmatter.cluster === "01 — Profile"
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(249, 115, 22, 0.25)"
                    }`,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: 
                      frontmatter.cluster === "03 — Portfolio Projects" 
                        ? "#22d3ee" 
                        : frontmatter.cluster === "01 — Profile"
                        ? "#ffffff"
                        : "#f97316",
                    background: 
                      frontmatter.cluster === "03 — Portfolio Projects" 
                        ? "rgba(34, 211, 238, 0.08)" 
                        : frontmatter.cluster === "01 — Profile"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(249, 115, 22, 0.08)",
                  }}
                >
                  {frontmatter.cluster}
                </span>
              </div>
            )}

            {/* Date */}
            {frontmatter.date && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, minWidth: "4rem" }}>
                  Date
                </span>
                <span style={{ fontSize: "0.78rem", color: "rgba(240,240,245,0.55)" }}>
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, minWidth: "4rem", paddingTop: "0.2rem" }}>
                  Tags
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-block",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "0.375rem",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.04)",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Backlinks count */}
            {backlinks.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, minWidth: "4rem" }}>
                  Links
                </span>
                <span style={{ fontSize: "0.78rem", color: "rgba(240,240,245,0.55)" }}>
                  {backlinks.length} incoming reference{backlinks.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MDX ARTICLE
            ══════════════════════════════════════════════════════════════ */}
        <article
          className={[
            "prose prose-invert prose-lg max-w-none",
            "prose-headings:text-white prose-headings:font-bold",
            "prose-h1:text-4xl",
            "prose-h2:text-2xl prose-h2:mt-12 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2",
            "prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline",
            "prose-strong:text-white",
            "prose-code:before:hidden prose-code:after:hidden prose-code:bg-cyan-500/10 prose-code:text-cyan-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal",
            "prose-pre:bg-[#020617] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-4 prose-pre:w-full prose-pre:overflow-x-auto",
            "prose-th:text-white prose-td:text-gray-300",
            "prose-blockquote:border-l-cyan-500/40 prose-blockquote:text-gray-400",
            "prose-hr:border-white/10",
            "prose-ul:list-disc",
            "prose-li:text-gray-300",
            "prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:border-b prose-th:border-white/10 prose-th:text-left prose-td:p-3 prose-td:border-b prose-td:border-white/5",
          ].join(" ")}
        >
          <MDXRemote
            source={safeContent}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath, remarkGfm, remarkBreaks],
                rehypePlugins: [
                  rehypeKatex,
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </article>

        {/* ══════════════════════════════════════════════════════════════
            BACKLINKS — Linked Mentions footer
            ══════════════════════════════════════════════════════════════ */}
        {backlinks.length > 0 && (
          <section style={{ marginTop: "4rem" }}>
            {/* Divider */}
            <div
              style={{
                height: "1px",
                width: "100%",
                marginBottom: "2rem",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
              }}
            />

            <h2
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1rem",
              }}
            >
              Linked Mentions
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {backlinks.map((bl) => (
                <Link
                  key={bl.slug}
                  href={`/notes/${bl.slug}`}
                  className="group glass-card block p-4 rounded-xl transition-all duration-300 no-underline"
                  style={{
                    background: "rgba(2, 4, 12, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.03)",
                  }}
                >
                  <style>{`
                    .group:hover { 
                      border-color: var(--accent) !important;
                      background: rgba(34, 211, 238, 0.05) !important;
                    }
                  `}</style>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {bl.title}
                  </p>
                  {bl.cluster && (
                    <p
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        color: 
                          bl.cluster === "03 — Portfolio Projects" 
                            ? "#22d3ee" 
                            : bl.cluster === "01 — Profile"
                            ? "#ffffff"
                            : "#f97316",
                        opacity: 0.8,
                        marginTop: "0.4rem",
                      }}
                    >
                      {bl.cluster}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
