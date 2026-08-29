"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: Toast["type"], message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast-enter rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 text-sm font-medium ${
              toast.type === "success"
                ? "bg-emerald-500/90 text-white"
                : toast.type === "error"
                ? "bg-red-500/90 text-white"
                : toast.type === "warning"
                ? "bg-amber-500/90 text-white"
                : "bg-sky-500/90 text-white"
            }`}
          >
            <span>
              {toast.type === "success"
                ? "✓"
                : toast.type === "error"
                ? "✕"
                : toast.type === "warning"
                ? "⚠"
                : "ℹ"}
            </span>
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
