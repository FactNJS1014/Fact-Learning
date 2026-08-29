"use client";

import { useState } from "react";

interface LanguageLogoProps {
  src: string | null | undefined;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const fallbackColors: Record<string, string> = {
  python: "#3776ab",
  javascript: "#f7df1e",
  java: "#f89820",
  go: "#00add8",
  php: "#777bb4",
  laravel: "#ff2d20",
  vuejs: "#42b883",
  react: "#61dafb",
  nextjs: "#000000",
  nuxtjs: "#00dc82",
  nodejs: "#339933",
  rust: "#ce422b",
  csharp: "#512bd4",
  flutter: "#02569b",
  flask: "#000000",
  django: "#092e20",
};

function getFallbackLetter(alt: string): string {
  return alt.charAt(0).toUpperCase();
}

function getFallbackColor(src: string | null | undefined): string {
  if (!src) return "#6366f1";
  for (const [key, color] of Object.entries(fallbackColors)) {
    if (src.toLowerCase().includes(key)) return color;
  }
  return "#6366f1";
}

export function LanguageLogo({
  src,
  alt,
  size = "lg",
  className = "",
}: LanguageLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold text-white ${className}`}
        style={{ backgroundColor: getFallbackColor(src) }}
      >
        <span className={size === "xl" ? "text-2xl" : size === "lg" ? "text-lg" : "text-sm"}>
          {getFallbackLetter(alt)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${alt} logo`}
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={() => setImgError(true)}
    />
  );
}
