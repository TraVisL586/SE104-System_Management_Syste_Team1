import { useState } from "react";
import { MessageSquare, Send, Users, User, Bell } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const HISTORY = [
  { id: 1, to: "CSC401-L01 (42 SV)", subject: "Nhắc nhở nộp bài tập số 5",       date: "10/05/2026", type: "class" },
  { id: 2, to: "CSC420-L01 (45 SV)", subject: "Thông báo thay đổi phòng thi",     date: "08/05/2026", type: "class" },
  { id: 3, to: "Nguyễn Thị Lan",     subject: "Phúc đáp: câu hỏi về bài kiểm tra",date: "06/05/2026", type: "personal" },
  { id: 4, to: "Tất cả các lớp",     subject: "Thông báo nghỉ học ngày 15/05",    date: "03/05/2026", type: "all" },
  { id: 5, to: "Trần Văn Bình",      subject: "Cảnh báo điểm học phần CSC401",    date: "01/05/2026", type: "personal" },
];

const CLASSES = ["CSC401-L01", "CSC401-L02", "CSC420-L01", "Tất cả các lớp"];

export function Communications() {
  const [form, setForm] = useState({ to: CLASSES[0], toType: "class", subject: "", body: "", priority: "normal" });
  const { showToast } = useToast();

  function send(e) {
    e.preventDefault();
    if (!form.subject.trim() || !form.body.trim()) {
      showToast("warning", "Thiếu thông tin", "Vui lòng điền đầy đủ Tiêu đề và Nội dung.");
      return;
    }
    showToast("success", "Đã gửi thông báo!", `Gửi tới: ${form.to} · ${form.subject}`);
    setForm((prev) => ({ ...prev, subject: "", body: "" }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Thông báo & Liên lạc</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Gửi thông báo và liên lạc với sinh viên trong lớp học phần
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Compose */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare size={18} color="#8b5cf6" />
            <p style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>Soạn thông báo mới</p>
          </div>
          <form onSubmit={send} className="space-y-4">
            {/* To */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Gửi tới</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {[
                  { key: "class", label: "Lớp học phần", icon: Users },
                  { key: "all",   label: "Tất cả lớp",  icon: Bell },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setForm((p) => ({ ...p, toType: key, to: key === "all" ? "Tất cả các lớp" : CLASSES[0] }))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                    style={{
                      fontSize: "0.78rem",
                      backgroundColor: form.toType === key ? "#4c1d95" : "#f8fafc",
                      color: form.toType === key ? "#fff" : "#475569",
                      border: `1px solid ${form.toType === key ? "#4c1d95" : "#e2e8f0"}`,
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>
              {form.toType === "class" && (
                <select
                  value={form.to}
                  onChange={(e) => setForm((p) => ({ ...p, to: e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
                >
                  {CLASSES.slice(0, 3).map((c) => <option key={c}>{c}</option>)}
                </select>
              )}
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Mức độ ưu tiên</label>
              <div className="flex gap-2">
                {[
                  { key: "normal", label: "Bình thường", color: "#64748b" },
                  { key: "important", label: "Quan trọng", color: "#f59e0b" },
                  { key: "urgent",    label: "Khẩn cấp",   color: "#ef4444" },
                ].map(({ key, label, color }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setForm((p) => ({ ...p, priority: key }))}
                    style={{
                      padding: "5px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600,
                      backgroundColor: form.priority === key ? `${color}18` : "#f8fafc",
                      color: form.priority === key ? color : "#94a3b8",
                      border: `1px solid ${form.priority === key ? color : "#e2e8f0"}`,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>
                Tiêu đề <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                value={form.subject}
                onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                placeholder="Nhập tiêu đề thông báo…"
                style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>
                Nội dung <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                rows={5}
                value={form.body}
                onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
                placeholder="Nội dung thông báo…"
                style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none", resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl"
              style={{ backgroundColor: "#4c1d95", color: "white", border: "none", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600 }}
            >
              <Send size={15} /> Gửi thông báo
            </button>
          </form>
        </div>

        {/* History */}
        <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Lịch sử gửi</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
            {HISTORY.map((h) => (
              <div key={h.id} className="flex items-start gap-3 px-5 py-4">
                <div style={{
                  width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  backgroundColor: h.type === "personal" ? "#dbeafe" : h.type === "all" ? "#d1fae5" : "#ede9fe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {h.type === "personal" ? <User size={15} color="#2563eb" /> : h.type === "all" ? <Bell size={15} color="#10b981" /> : <Users size={15} color="#8b5cf6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e293b" }} className="truncate">{h.subject}</p>
                  <p style={{ fontSize: "0.72rem", color: "#64748b" }}>Tới: {h.to}</p>
                  <p style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: 2 }}>{h.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communications;