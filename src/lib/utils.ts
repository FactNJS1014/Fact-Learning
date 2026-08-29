import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXPForNextLevel(level: number): number {
  return level * 100;
}

export function getXPProgressInLevel(xp: number): number {
  const level = getLevelFromXP(xp);
  const xpInCurrentLevel = xp - (level - 1) * 100;
  return xpInCurrentLevel;
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export const PROGRAMMING_LANGUAGES = [
  { name: "Java", icon: "☕", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#f89820" },
  { name: "Python", icon: "🐍", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776ab" },
  { name: "Go", icon: "🐹", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", color: "#00add8" },
  { name: "PHP", icon: "🐘", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "#777bb4" },
  { name: "Laravel", icon: "🔺", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", color: "#ff2d20" },
  { name: "Vue", icon: "💚", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", color: "#42b883" },
  { name: "React", icon: "⚛️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb" },
  { name: "Next.js", icon: "▲", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" },
  { name: "Nuxt.js", icon: "💚", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", color: "#00dc82" },
  { name: "Node.js", icon: "💚", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Rust", icon: "🦀", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", color: "#ce422b" },
  { name: "C#", icon: "🔷", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", color: "#512bd4" },
  { name: "Flutter", icon: "💙", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "#02569b" },
  { name: "React Native", icon: "⚛️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb" },
  { name: "Flask", icon: "🧪", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", color: "#000000" },
  { name: "Django", icon: "🟢", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg", color: "#092e20" },
];

export const COURSE_LEVELS = ["BASIC", "INTERMEDIATE", "ADVANCED"] as const;
export const DIFFICULTIES = [
  "BEGINNER",
  "EASY",
  "MEDIUM",
  "HARD",
  "EXPERT",
] as const;
