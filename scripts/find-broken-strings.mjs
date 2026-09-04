// Scan a TS file for double-quoted string literals that end the line unterminated.
import fs from "node:fs";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node scripts/find-broken-strings.mjs <file.ts> ...");
  process.exit(1);
}

for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const problems = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let inStr = false;
    let opened = -1;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === "\\") {
        j++;
        continue;
      }
      if (c === '"') {
        inStr = !inStr;
        if (inStr) opened = j;
      }
    }
    if (inStr) {
      problems.push(
        `${i + 1}: ends inside string (opened col ${opened + 1}): ${line.slice(0, 90)}`,
      );
    }
  }
  console.log(`== ${file} ==`);
  console.log(problems.length ? problems.join("\n") : "  clean");
}