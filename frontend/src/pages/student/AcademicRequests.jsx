import { useState } from "react";
import { FileText, Plus, Clock, CheckCircle2, XCircle, AlertCircle, Send } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const REQUEST_TYPES = [
  "Xin nghỉ học tạm thời",
  "Phúc khảo bài thi",
  "Xin bảo lưu kết quả",
  "Đơn xin miễn giảm học phí",
  "Xin chuyển lớp học phần",
  "Xin học cải thiện điểm",
  "Cấp bảng điểm",
  "Xác nhận sinh viên",
  "Khác",
];

const HISTORY = [
  { id: "YC-2026-047", type: "Xin nghỉ học tạm thời",   date: "02/05/2026", status: "approved", reason: "Lý do sức khỏe – có xác nhận bệnh viện", note: "Được duyệt bởi TS. Phạm Thị Hoa · 04/05/2026" },
  { id: "YC-2026-031", type: "Phúc khảo bài thi",        date: "18/04/2026", status: "pending",  reason: "Điểm cuối kỳ CSC301 thấp hơn dự đoán",   note: "Đang chờ cố vấn xem xét" },
  { id: "YC-2026-012", type: "Cấp bảng điểm",            date: "01/03/2026", status: "approved", reason: "Cần nộp hồ sơ học bổng",                  note: "Đã cấp 12/03/2026" },
  { id: "YC-2026-003", type: "Xin chuyển lớp học phần",  date: "10/02/2026", status: "rejected", reason: "Lớp ENG201 trùng lịch MTH302",             note: "Từ chối: lớp mong muốn đã đầy" },
];

const STATUS_CFG = {
  approved: { label: "Được duyệt",    color: "#10b981", bg: "#d1fae5", icon: CheckCircle2 },
  pending:  { label: "Đang xử lý",    color: "#f59e0b", bg: "#fef3c7", icon: Clock },
  rejected: { label: "Bị từ chối",    color: "#ef4444", bg: "#fee2e2", icon: XCircle },
};

export function AcademicRequest() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ type: REQUEST_TYPES[0], reason: "", urgent: false });
  const { showToast }           = useToast();

  function submit(e) {
    e.preventDefault();
    if (!form.reason.trim()) {
      showToast("warning", "Thiếu thông tin", "Vui lòng nhập lý do / nội dung yêu cầu.");
      return;
    }
    showToast("success", "Đã gửi yêu cầu!", `${form.type} · Mã: YC-2026-${Date.now().toString().slice(-3)}`);
    setForm({ type: REQUEST_TYPES[0], reason: "", urgent: false });
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ color: "#1e293b" }}>Yêu cầu Học vụ</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
            Nộp và theo dõi các đơn từ học vụ — xử lý bởi Cố vấn Học tập
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: "#1a3461", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
        >
          <Plus size={16} /> Nộp đơn mới
        </button>
      </div>

      {/* New request form */}
      {showForm && (
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-2 mb-5">
            <FileText size={18} color="#2563eb" />
            <p style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>Đơn yêu cầu học vụ mới</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>
                Loại yêu cầu <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#334155", outline: "none" }}
              >
                {REQUEST_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>
                Lý do / Nội dung chi tiết <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Mô tả chi tiết lý do và nội dung yêu cầu của bạn…"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#334155", outline: "none", resize: "vertical" }}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="urgent"
                checked={form.urgent}
                onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                style={{ width: 16, height: 16, cursor: "pointer" }}
              />
              <label htmlFor="urgent" style={{ fontSize: "0.82rem", color: "#334155", cursor: "pointer" }}>
                Đánh dấu khẩn cấp
              </label>
              {form.urgent && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "#f59e0b", fontWeight: 600 }}>
                  <AlertCircle size={12} /> Yêu cầu sẽ được ưu tiên xử lý
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 rounded-xl"
                style={{ border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.85rem", color: "#475569" }}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl"
                style={{ backgroundColor: "#1a3461", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}
              >
                <Send size={15} /> Gửi yêu cầu
              </button>
            </div>
          </form>
        </div>
      )}

      {/* History */}
      <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Lịch sử yêu cầu</p>
        </div>
        <div className="space-y-0">
          {HISTORY.map((req) => {
            const cfg  = STATUS_CFG[req.status];
            const Icon = cfg.icon;
            return (
              <div
                key={req.id}
                className="flex items-start gap-4 px-5 py-4"
                style={{ borderBottom: "1px solid #f1f5f9" }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={17} color={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1e293b" }}>{req.type}</p>
                      <p style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#94a3b8", marginTop: 1 }}>{req.id}</p>
                    </div>
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: "0.7rem", fontWeight: 600, whiteSpace: "nowrap" }}
                    >
                      <Icon size={10} /> {cfg.label}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#475569", marginTop: 6 }}>{req.reason}</p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Ngày nộp: {req.date}</span>
                    <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{req.note}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AcademicRequest;