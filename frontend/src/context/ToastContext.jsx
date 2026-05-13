import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

// Khởi tạo Context
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Hàm tắt toast
  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  // Hàm hiển thị toast (tự động ẩn sau 4.5s)
  const showToast = useCallback((type, title, message) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, title, message }]);
    setTimeout(() => dismissToast(id), 4500);
  }, [dismissToast]);

  const ICONS = { success: CheckCircle2, error: XCircle, warning: AlertCircle, info: Info };

  // Chuyển đổi mã màu Hex sang các class của Tailwind
  const STYLES = {
    success: { bg: "bg-green-50", border: "border-green-200", icon: "text-green-500", title: "text-green-800" },
    error:   { bg: "bg-red-50", border: "border-red-200", icon: "text-red-500", title: "text-red-800" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500", title: "text-amber-800" },
    info:    { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-500", title: "text-blue-800" },
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex w-full max-w-[380px] flex-col gap-2.5">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          const s = STYLES[toast.type];

          return (
            <div
              key={toast.id}
              className={`flex items-start gap-3 rounded-2xl border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${s.bg} ${s.border}`}
              style={{ animation: "slideUp 0.3s ease" }}
            >
              <Icon size={18} className={`mt-[2px] shrink-0 ${s.icon}`} />

              <div className="min-w-0 flex-1">
                <p className={`text-[14px] font-bold ${s.title}`}>
                  {toast.title}
                </p>
                {toast.message && (
                  <p className={`mt-0.5 text-[12.5px] opacity-80 ${s.title}`}>
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                className={`shrink-0 bg-transparent p-0 transition-opacity hover:opacity-70 ${s.icon}`}
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Inline keyframes để giữ animation mượt mà không cần can thiệp tailwind.config.js */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

/**
 * Hook tùy chỉnh để sử dụng Toast
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast phải được sử dụng bên trong ToastProvider");
  }
  return context;
}