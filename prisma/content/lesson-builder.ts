// Lesson markdown builder — assembles a full lesson structure (per FactLearning spec):
// Title, Learning Objective, Introduction, Concept, Syntax, Example, Output,
// Common Mistakes, Best Practices, Exercise, Mini Challenge, Summary.
import type { LessonContent } from "../seed-content";

export interface LessonSpec {
  title: string;
  slug: string;
  minutes?: number;
  objective: string;
  intro: string;
  concepts: string[];
  syntax?: { lang: string; code: string };
  example: { lang: string; code: string; output: string };
  mistakes: string[];
  bestPractices: string[];
  exerciseTitle: string;
  exerciseDescription: string;
  exerciseRequirements: string[];
  challenge: string;
  summary: string;
  exercisePoints?: number;
  quiz?: LessonContent["quiz"];
}

function fence(lang: string, code: string): string {
  return "```" + lang + "\n" + code + "\n```";
}

export function lesson(s: LessonSpec): LessonContent {
  const parts: string[] = [];

  parts.push(`# ${s.title}`);
  parts.push("");
  parts.push(`> 🎯 **Learning Objective:** ${s.objective}`);
  parts.push("");

  parts.push("## Introduction");
  parts.push("");
  parts.push(s.intro);
  parts.push("");

  parts.push("## Concept");
  parts.push("");
  for (const c of s.concepts) {
    parts.push(c);
    parts.push("");
  }

  if (s.syntax) {
    parts.push("## Syntax");
    parts.push("");
    parts.push(fence(s.syntax.lang, s.syntax.code));
    parts.push("");
  }

  parts.push("## Example");
  parts.push("");
  parts.push(fence(s.example.lang, s.example.code));
  parts.push("");
  parts.push("**Output:**");
  parts.push("");
  parts.push(fence("text", s.example.output));
  parts.push("");

  parts.push("## Common Mistakes");
  parts.push("");
  for (const m of s.mistakes) {
    parts.push(`- ❌ ${m}`);
  }
  parts.push("");

  parts.push("## Best Practices");
  parts.push("");
  for (const b of s.bestPractices) {
    parts.push(`- ✅ ${b}`);
  }
  parts.push("");

  parts.push("## Exercise");
  parts.push("");
  parts.push(`**Task:** ${s.exerciseDescription}`);
  parts.push("");
  for (const r of s.exerciseRequirements) {
    parts.push(`- ${r}`);
  }
  parts.push("");

  parts.push("## Mini Challenge");
  parts.push("");
  parts.push(s.challenge);
  parts.push("");

  parts.push("## Summary");
  parts.push("");
  parts.push(s.summary);
  parts.push("");

  const content = parts.join("\n");

  const lessonContent: LessonContent = {
    title: s.title,
    slug: s.slug,
    content,
    estimatedMinutes: s.minutes || 15,
    exercises: [
      {
        title: s.exerciseTitle,
        description: s.exerciseDescription,
        requirements: s.exerciseRequirements,
        points: s.exercisePoints || 10,
      },
    ],
  };

  if (s.quiz) {
    lessonContent.quiz = s.quiz;
  }

  return lessonContent;
}