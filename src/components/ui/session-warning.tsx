"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth.actions";

export function SessionWarning() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) {
          setShowModal(true);
          return;
        }
        const data = await res.json();
        if (data.expiresAt) {
          const expiresAt = new Date(data.expiresAt).getTime();
          const now = Date.now();
          const diff = expiresAt - now;

          if (diff <= 0) {
            setShowModal(true);
            return;
          }

          setRemaining(Math.floor(diff / 1000));

          // Show warning when 5 minutes remain
          if (diff <= 5 * 60 * 1000 && diff > 0) {
            // Will be visible in the timer display
          }
        }
      } catch {
        setShowModal(true);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 30000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (remaining === null || remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setShowModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining !== null && remaining > 0]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleLoginAgain = async () => {
    await logoutAction();
  };

  // Show warning banner when less than 5 minutes remain
  if (remaining !== null && remaining > 0 && remaining <= 300 && !showModal) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 text-sm flex items-center justify-between">
        <span>
          ⚠ Session expires in <strong>{formatTime(remaining)}</strong>
        </span>
        <button
          onClick={handleLoginAgain}
          className="text-amber-400 underline hover:no-underline font-medium"
        >
          Login Again
        </button>
      </div>
    );
  }

  // Show expired modal
  if (showModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 modal-fade-in">
        <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 modal-scale-in border border-border">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Session Expired
            </h2>
            <p className="text-muted-foreground mb-6">
              For security reasons, your session has expired after 1 day.
              Please log in again to continue.
            </p>
            <button
              onClick={handleLoginAgain}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              LOGIN AGAIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
