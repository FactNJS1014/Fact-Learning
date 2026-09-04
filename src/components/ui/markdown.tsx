"use client";

import { useState } from "react";

// Lightweight markdown renderer: headings, lists, blockquotes, inline code,
// and fenced code blocks styled like a terminal (language label + copy + line numbers).

interface CodeBlockProps {
  lang: string;
  code: string;
}

function CodeBlock({ lang, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  const lines = code.split("\n");

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-border bg-code-bg">
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-border/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider font-mono text-code-text/60">
            {lang || "text"}
          </span>
          <button
            onClick={copy}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-code-text/80 transition-colors"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="align-top">
                <td className="select-none text-right pr-3 pl-4 py-0 text-[11px] leading-6 font-mono text-code-text/30 border-r border-border/30">
                  {i + 1}
                </td>
                <td className="pl-3 pr-4 py-0 text-[13px] leading-6 font-mono text-code-text whitespace-pre">
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Markdown({ content }: { content: string }) {
  const blocks: { type: "code" | "md"; lang: string; content: string }[] = [];
  const lines = content.split("\n");
  let current: { type: "code" | "md"; lang: string; content: string } | null =
    null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      if (current?.type === "code") {
        blocks.push(current);
        current = null;
      } else {
        if (current) blocks.push(current);
        current = { type: "code", lang: fence[1] || "text", content: "" };
      }
      continue;
    }
    if (current?.type === "code") {
      current.content += line + "\n";
    } else {
      if (current) blocks.push(current);
      current = { type: "md", lang: "", content: line + "\n" };
    }
  }
  if (current) blocks.push(current);

  return (
    <div className="prose prose-invert max-w-none prose-headings:text-foreground">
      {blocks.map((block, i) => {
        if (block.type === "code") {
          return (
            <CodeBlock
              key={i}
              lang={block.lang}
              code={block.content.replace(/\n$/, "")}
            />
          );
        }
        const mdLines = block.content.split("\n").filter((l) => l.trim() !== "");
        return (
          <div key={i}>
            {mdLines.map((line, j) => {
              if (line.startsWith("# ")) {
                return (
                  <h1
                    key={j}
                    className="text-2xl font-bold mt-8 mb-4 text-foreground"
                  >
                    {line.slice(2)}
                  </h1>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2
                    key={j}
                    className="text-xl font-bold mt-6 mb-3 text-foreground"
                  >
                    {line.slice(3)}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3
                    key={j}
                    className="text-lg font-bold mt-4 mb-2 text-foreground"
                  >
                    {line.slice(4)}
                  </h3>
                );
              }
              if (line.startsWith("- ") || line.startsWith("* ")) {
                return (
                  <li key={j} className="text-muted-foreground ml-4 list-disc">
                    {renderInline(line.slice(2))}
                  </li>
                );
              }
              if (line.startsWith("> ")) {
                return (
                  <blockquote
                    key={j}
                    className="border-l-4 border-primary pl-4 text-muted-foreground italic my-4"
                  >
                    {renderInline(line.slice(2))}
                  </blockquote>
                );
              }
              return (
                <p
                  key={j}
                  className="text-muted-foreground mb-3 leading-relaxed"
                >
                  {renderInline(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function renderInline(line: string) {
  if (!line.includes("`")) return line;
  const parts = line.split(/`([^`]+)`/);
  return parts.map((part, j) =>
    j % 2 === 1 ? (
      <code
        key={j}
        className="bg-code-bg text-code-text px-1.5 py-0.5 rounded text-sm font-mono"
      >
        {part}
      </code>
    ) : (
      <span key={j}>{part}</span>
    )
  );
}