"use client";

import { useState } from "react";
import { useTheme } from "@/components/ui/theme-provider";
import { useActionState } from "react";
import { updateProfileAction } from "@/lib/actions/profile.actions";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  const [state, formAction, isPending] = useActionState(updateProfileAction, null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {["account", "appearance", "notifications", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Account */}
      {activeTab === "account" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-bold text-foreground mb-4">Account Settings</h2>
          {state?.success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg mb-4 text-sm">
              Profile updated successfully!
            </div>
          )}
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {state.error}
            </div>
          )}
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {/* Appearance */}
      {activeTab === "appearance" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-bold text-foreground mb-4">Appearance</h2>
          <div className="space-y-3">
            {(["dark", "light", "system"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                  theme === t
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <span className="text-lg">
                  {t === "dark" ? "🌙" : t === "light" ? "☀️" : "💻"}
                </span>
                <span className="text-sm font-medium text-foreground capitalize">
                  {t} Mode
                </span>
                {theme === t && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-bold text-foreground mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: "Course Updates", desc: "When courses you're enrolled in are updated" },
              { label: "Quiz Results", desc: "When you complete a quiz" },
              { label: "Achievements", desc: "When you unlock new achievements" },
              { label: "Course Completed", desc: "When you finish a course" },
              { label: "Certificate Ready", desc: "When a certificate is generated" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-secondary peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-bold text-foreground mb-4">Security</h2>
          <div className="space-y-4">
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm font-medium text-foreground">Session Duration</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your session expires after 1 day for security. You will need to
                log in again.
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm font-medium text-foreground">Password</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your password is securely hashed with bcrypt. Last changed: Unknown
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
