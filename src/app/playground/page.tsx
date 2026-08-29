"use client";

import { useState } from "react";

const LANGUAGES = [
  { id: "javascript", name: "JavaScript", icon: "📜" },
  { id: "python", name: "Python", icon: "🐍" },
  { id: "typescript", name: "TypeScript", icon: "🔷" },
  { id: "go", name: "Go", icon: "🐹" },
  { id: "rust", name: "Rust", icon: "🦀" },
  { id: "php", name: "PHP", icon: "🐘" },
  { id: "csharp", name: "C#", icon: "🔷" },
];

const DEFAULT_CODE: Record<string, string> = {
  javascript: `// Welcome to FactLearning Playground!\nconsole.log("Hello, World!");\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("FactLearning"));`,
  python: `# Welcome to FactLearning Playground!\nprint("Hello, World!")\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("FactLearning"))`,
  typescript: `// Welcome to FactLearning Playground!\nconst greeting: string = "Hello, World!";\nconsole.log(greeting);\n\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("FactLearning"));`,
  go: `// Welcome to FactLearning Playground!\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    fmt.Println(greet("FactLearning"))\n}\n\nfunc greet(name string) string {\n    return fmt.Sprintf("Hello, %s!", name)\n}`,
  rust: `// Welcome to FactLearning Playground!\nfn main() {\n    println!("Hello, World!");\n    println!("{}", greet("FactLearning"));\n}\n\nfn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}`,
  php: `<?php\n// Welcome to FactLearning Playground!\necho "Hello, World!\\n";\n\nfunction greet($name) {\n    return "Hello, $name!";\n}\n\necho greet("FactLearning") . "\\n";\n?>`,
  csharp: `// Welcome to FactLearning Playground!\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n        Console.WriteLine(Greet("FactLearning"));\n    }\n    \n    static string Greet(string name) {\n        return $"Hello, {name}!";\n    }\n}`,
};

export default function PlaygroundPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput([]);

    // Client-side safe execution only for JavaScript
    if (language === "javascript") {
      try {
        const logs: string[] = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(String).join(" "));
        };

        // Safe limited execution (no eval in production — sandboxed in future)
        const safeExec = new Function("console", code);
        safeExec({ log: (...args: unknown[]) => logs.push(args.map(String).join(" ")) });

        console.log = originalConsoleLog;
        setOutput(logs.length > 0 ? logs : ["Program executed successfully."]);
      } catch (err) {
        setOutput([`Error: ${err instanceof Error ? err.message : String(err)}`]);
      }
    } else {
      // For other languages, show a placeholder message
      setOutput([
        `⚠ ${language} execution is not yet supported in the browser.`,
        "Full sandboxed execution will be available in a future update.",
        "",
        "For now, you can:",
        "1. Write your code here for reference",
        "2. Copy it and run in your local environment",
        "3. Use an online compiler for that language",
      ]);
    }

    setIsRunning(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Code Playground</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Write and test code in your browser
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => {
              setLanguage(lang.id);
              setCode(DEFAULT_CODE[lang.id] || "");
              setOutput([]);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              language === lang.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang.icon} {lang.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/50">
            <span className="text-xs text-muted-foreground font-medium">
              Editor
            </span>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 disabled:opacity-50"
            >
              {isRunning ? "Running..." : "▶ Run"}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-transparent text-foreground font-mono text-sm p-4 resize-none focus:outline-none"
            spellCheck={false}
            placeholder="Write your code here..."
          />
        </div>

        {/* Output */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-border bg-secondary/50">
            <span className="text-xs text-muted-foreground font-medium">
              Output
            </span>
          </div>
          <div className="h-96 overflow-auto p-4">
            {output.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Click &quot;Run&quot; to execute your code...
              </p>
            ) : (
              <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
                {output.join("\n")}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 bg-secondary/50 border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> Currently only JavaScript runs in-browser. Other
          languages will be supported with sandboxed execution in future updates.
          No code is sent to any server — everything runs locally in your browser.
        </p>
      </div>
    </div>
  );
}
