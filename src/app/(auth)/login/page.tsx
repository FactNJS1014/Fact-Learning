"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth.actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Sign in to continue learning
        </p>
      </div>

      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Email or Username
          </label>
          <input
            type="text"
            name="email"
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your email or username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Signing in..." : "LOGIN"}
        </button>
      </form>

      <p className="text-center text-muted-foreground text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Create Account
        </Link>
      </p>
    </div>
  );
}
