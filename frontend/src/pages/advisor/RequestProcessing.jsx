import { useState } from "react";
import { CheckCircle2, XCircle, Clock, AlertTriangle, MessageSquare, Search } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const INITIAL_REQUESTS = [
  { id: "YC-2026-031", student: "Trần Văn Hùng",  id_sv: "SV.2022.01234", type: "Phúc khảo bài thi",       reason: "Điểm cuối kỳ CSC401 thấp hơn mong đợi, đề nghị phúc khảo.",          date: "18/04/2026", status: "pending", urgent: false, attachment: false },
  { id: "YC-2026-044", student: "Phạm Thu Dung",   id_sv: "SV.2023.00991", type: "Xin nghỉ học tạm thời",   reason: "Lý do sức khỏe – đã có giấy xác nhận của bệnh viện Bạch Mai.",          date: "30/04/2026", status: "pending", urgent: true,  attachment: true  },
  { id: "YC-2026-051", student: "Lê Minh Châu",    id_sv: "SV.2023.00003", type: "Xin bảo lưu kết quả",    reason: "Gia đình có hoàn cảnh khó khăn, cần bảo lưu 1 học kỳ.",                 date: "05/05/2026", status: "pending", urgent: false, attachment: false },
  { id: "YC-2026-058", student: "Hoàng Văn Nam",   id_sv: "SV.2023.00456", type: "Miễn giảm học phí",       reason: "Thuộc hộ nghèo – có xác nhận của UBND phường.",                          date: "08/05/2026", status: "pending", urgent: true,  attachment: true  },
  { id: "YC-2026-012", student: "Nguyễn Thị Lan",  id_sv: "SV.2023.00847", type: "Cấp bảng điểm",          reason: "Cần bảng điểm để nộp hồ sơ học bổng.",                                  date: "01/03/2026", status: "approved",urgent: false, attachment: false },
  { id: "YC-2026-003", student: "Bùi Thanh Tùng",  id_sv: "SV.2022.00876", type: "Xin chuyển lớp HP",      reason: "Lớp ENG201-L01 trùng lịch với MTH302-L02.",                              date: "10/02/2026", status: "rejected",urgent: false, attachment: false },
];

const STATUS_CFG = {
  pending:  { label: "Chờ xử lý",   color: "#f59e0b", bg: "#fef3c7", icon: Clock },
  approved: { label: "Đã duyệt",    color: "#10b981", bg: "#d1fae5", icon: CheckCircle2 },
  rejected: { label: "Từ chối",     color: "#ef4444", bg: "#fee2e2", icon: XCircle },
};

export function RequestProcessing() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("pending");
  const [reviewing,setReviewing]= useState(null);
  const [note,     setNote]     = useState("");
  const { showToast } = useToast();

  const filtered = requests.filter((r) => {
    const matchS = r.student.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchF = filter === "all" || r.status === filter;
    return matchS && matchF;
  });

  function decide(id, decision) {
    if (!note.trim()) {
      showToast("warning", "Cần ghi chú", "Vui lòng nhập ghi chú/lý do xử lý.");
      return;
    }
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: decision } : r))
    );
    const req = requests.find((r) => r.id === id);
    showToast(
      decision === "approved" ? "success" : "info",
      decision === "approved" ? "Đã duyệt yêu cầu" : "Đã từ chối yêu cầu",
      `${req?.type} — ${req?.student}`
    );
    setReviewing(null);
    setNote("");
  }

  const counts = { pending: 0, approved: 0, rejected: 0, all: requests.length };
  requests.forEach((r) => { counts[r.status] = (counts[r.status] ?? 0) + 1; });

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Xử lý Yêu cầu Học vụ</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Duyệt hoặc từ chối các đơn yêu cầu học vụ của sinh viên — UC15
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "pending",  label: "Chờ xử lý" },
          { key: "approved", label: "Đã duyệt" },
          { key: "rejected", label: "Từ chối" },
          { key: "all",      label: "Tất cả" },
        ].map(({ key, label }) => {
          const cfg = STATUS_CFG[key] ?? { color: "#64748b", bg: "#f1f5f9" };
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: "7px 16px", borderRadius: 10, fontSize: "0.82rem",
                backgroundColor: filter === key ? (key === "all" ? "#1a3461" : cfg.bg) : "#fff",
                color: filter === key ? (key === "all" ? "#fff" : cfg.color) : "#64748b",
                border: `1px solid ${filter === key ? (key === "all" ? "#1a3461" : cfg.color) : "#e2e8f0"}`,
                cursor: "pointer", fontWeight: filter === key ? 600 : 400,
              }}
            >
              {label}
              <span style={{ marginLeft: 6, fontSize: "0.72rem", opacity: 0.8 }}>({counts[key]})</span>
            </button>
          );
        })}
        <div style={{ position: "relative", marginLeft: "auto" }}>
          <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
          <input
            placeholder="Tìm đơn, sinh viên…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.82rem", outline: "none", width: 220 }}
          />
        </div>
      </div>

      {/* Requests list */}
      <div className="space-y-3">
        {filtered.map((req) => {
          const cfg  = STATUS_CFG[req.status];
          const Icon = cfg.icon;
          const isR  = reviewing === req.id;
          return (
            <div
              key={req.id}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#fff", border: `1px solid ${isR ? "#f59e0b" : "#e2e8f0"}` }}
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-start gap-3">
                  <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={17} color={cfg.color} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "#1e293b" }}>{req.type}</p>
                      {req.urgent && (
                        <span style={{ fontSize: "0.62rem", backgroundColor: "#fee2e2", color: "#ef4444", padding: "1px 7px", borderRadius: 9999, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                          <AlertTriangle size={9} /> KHẨN
                        </span>
                      )}
                      {req.attachment && (
                        <span style={{ fontSize: "0.62rem", backgroundColor: "#dbeafe", color: "#2563eb", padding: "1px 7px", borderRadius: 9999, fontWeight: 600 }}>
                          📎 Có tài liệu đính kèm
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 2 }}>
                      {req.student} · <span style={{ fontFamily: "monospace" }}>{req.id_sv}</span> · Mã đơn: {req.id}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#475569", marginTop: 6, lineHeight: 1.5 }}>{req.reason}</p>
                    <p style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: 4 }}>Ngày nộp: {req.date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "3px 10px", borderRadius: 9999, backgroundColor: cfg.bg, color: cfg.color }}>
                    {cfg.label}
                  </span>
                  {req.status === "pending" && (
                    <button
                      onClick={() => { setReviewing(isR ? null : req.id); setNote(""); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ backgroundColor: "#fef3c7", color: "#92400e", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}
                    >
                      <MessageSquare size={12} /> {isR ? "Thu gọn" : "Xử lý"}
                    </button>
                  )}
                </div>
              </div>

              {/* Review panel */}
              {isR && (
                <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid #f1f5f9" }}>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 5 }}>
                      Ghi chú / Lý do xử lý <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Nhập ghi chú hoặc lý do duyệt/từ chối…"
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.82rem", outline: "none", resize: "none" }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => decide(req.id, "approved")}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                      style={{ backgroundColor: "#065f46", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
                    >
                      <CheckCircle2 size={15} /> Duyệt
                    </button>
                    <button
                      onClick={() => decide(req.id, "rejected")}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                      style={{ backgroundColor: "#fee2e2", color: "#ef4444", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
                    >
                      <XCircle size={15} /> Từ chối
                    </button>
                    <button
                      onClick={() => setReviewing(null)}
                      className="px-4 py-2.5 rounded-xl"
                      style={{ border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <CheckCircle2 size={32} color="#cbd5e1" style={{ margin: "0 auto 10px" }} />
            <p style={{ color: "#94a3b8" }}>Không có yêu cầu nào {filter === "pending" ? "đang chờ xử lý" : ""}.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestProcessing;