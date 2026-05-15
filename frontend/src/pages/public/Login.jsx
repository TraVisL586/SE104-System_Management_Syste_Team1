import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useRole } from "../../context/RoleContext.jsx";
import { login as loginRequest } from "../../services/AuthService";

const DEMO_ACCOUNTS = [
  {
    role: "STUDENT",
    email: "lan.nguyen@student.edu.vn",
    label: "Sinh viên",
    color: "#2563eb",
    bg: "#dbeafe"
  },
  {
    role: "LECTURER",
    email: "an.nguyen@edu.vn",
    label: "Giảng viên",
    color: "#8b5cf6",
    bg: "#ede9fe"
  },
  {
    role: "ADMIN",
    email: "khoa.tran@admin.edu.vn",
    label: "Quản trị",
    color: "#10b981",
    bg: "#d1fae5"
  },
  {
    role: "ACADEMIC_ADVISOR", // Lưu ý: Đổi thành ADVISOR cho khớp với DEMO_USERS của bạn
    email: "hoa.pham@edu.vn",
    label: "Cố vấn",
    color: "#f59e0b",
    bg: "#fef3c7"
  },
];

export function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const { loginWithBackend } = useRole();
  const navigate  = useNavigate();

  function fillDemo(acc) {
    setEmail(acc.email);
    setPassword("Demo@123456");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const username = email.trim();

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      setLoading(false);
      return;
    }

    try {
      const response = await loginRequest({ username, password });
      loginWithBackend(response);
      navigate("/", { replace: true });
    } catch (err) {
      const message = err?.data?.message || err?.message || "Đăng nhập thất bại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a3461 60%, #1e3a8a 100%)" }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div style={{ width: 60, height: 60, borderRadius: 18, backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(37,99,235,0.4)" }}>
            <GraduationCap size={30} color="white" />
          </div>
          <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800 }}>EduPortal</h1>
          <p style={{ color: "#93c5fd", fontSize: "0.85rem", marginTop: 4 }}>Hệ thống Quản lý Sinh viên</p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
          <h2 style={{ color: "#1e293b", fontSize: "1.2rem", fontWeight: 700, marginBottom: 4 }}>Đăng nhập</h2>
          <p style={{ color: "#64748b", fontSize: "0.82rem", marginBottom: 24 }}>Nhập thông tin tài khoản để tiếp tục</p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
              <AlertCircle size={15} color="#ef4444" />
              <p style={{ fontSize: "0.78rem", color: "#ef4444" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>
                Email <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@edu.vn"
                  style={{ width: "100%", paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11, borderRadius: 12, border: "1px solid #e2e8f0", fontSize: "0.88rem", color: "#334155", outline: "none" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155" }}>
                  Mật khẩu <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  style={{ fontSize: "0.75rem", color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={15} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: "100%", paddingLeft: 38, paddingRight: 42, paddingTop: 11, paddingBottom: 11, borderRadius: 12, border: "1px solid #e2e8f0", fontSize: "0.88rem", color: "#334155", outline: "none" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}
                >
                  {showPw ? <EyeOff size={15} color="#94a3b8" /> : <Eye size={15} color="#94a3b8" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl"
              style={{ backgroundColor: loading ? "#93c5fd" : "#1a3461", color: "white", border: "none", cursor: loading ? "wait" : "pointer", fontSize: "0.92rem", fontWeight: 700, marginTop: 8 }}
            >
              {loading ? "Đang đăng nhập…" : "Đăng nhập"}
            </button>
          </form>

          {/* Demo accounts */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
            <p style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Tài khoản Demo — click để điền tự động
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  style={{
                    padding: "9px 10px", borderRadius: 10, textAlign: "left", cursor: "pointer",
                    backgroundColor: acc.bg,
                    border: `1px solid ${acc.color}30`,
                  }}
                >
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: acc.color }}>{acc.label}</p>
                  <p style={{ fontSize: "0.62rem", color: "#64748b", marginTop: 1 }} className="truncate">{acc.email}</p>
                </button>
              ))}
            </div>
            <p style={{ fontSize: "0.65rem", color: "#94a3b8", marginTop: 8, textAlign: "center" }}>Mật khẩu demo: <code style={{ backgroundColor: "#f1f5f9", padding: "1px 5px", borderRadius: 4 }}>Demo@123456</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
