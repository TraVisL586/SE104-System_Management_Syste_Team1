import { useState } from "react";
import { Search, AlertTriangle, CheckCircle2, XCircle, Edit2, Save } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const INITIAL_STUDENTS = [
  { id: "SV.2023.00847", name: "Nguyễn Thị Lan",   gpa: 8.3,  tc: 86, khoa: "CNTT",    status: "active",    warningCount: 0 },
  { id: "SV.2022.01234", name: "Trần Văn Hùng",     gpa: 4.1,  tc: 62, khoa: "CNTT",    status: "warning2",  warningCount: 2 },
  { id: "SV.2021.00568", name: "Lê Thị Mai",         gpa: 3.2,  tc: 45, khoa: "Kinh tế", status: "suspended", warningCount: 3 },
  { id: "SV.2023.00991", name: "Phạm Quốc Bảo",      gpa: 5.8,  tc: 75, khoa: "Kỹ thuật",status: "warning1",  warningCount: 1 },
  { id: "SV.2022.00412", name: "Hoàng Thu Hà",        gpa: 7.2,  tc: 95, khoa: "Ngoại ngữ",status:"active",   warningCount: 0 },
  { id: "SV.2020.00234", name: "Vũ Minh Khôi",        gpa: 2.8,  tc: 38, khoa: "CNTT",    status: "expelled",  warningCount: 4 },
  { id: "SV.2023.01102", name: "Đinh Thị Ngọc",       gpa: 6.5,  tc: 72, khoa: "Kinh tế", status: "active",    warningCount: 0 },
  { id: "SV.2022.00876", name: "Bùi Thanh Tùng",      gpa: 4.8,  tc: 58, khoa: "CNTT",    status: "warning1",  warningCount: 1 },
];

const STATUS_CFG = {
  active:    { label: "Bình thường",    color: "#10b981", bg: "#d1fae5", icon: CheckCircle2 },
  warning1:  { label: "Cảnh báo lần 1", color: "#f59e0b", bg: "#fef3c7", icon: AlertTriangle },
  warning2:  { label: "Cảnh báo lần 2", color: "#ef4444", bg: "#fee2e2", icon: AlertTriangle },
  suspended: { label: "Đình chỉ HK",   color: "#dc2626", bg: "#fee2e2", icon: XCircle },
  expelled:  { label: "Buộc thôi học", color: "#7f1d1d", bg: "#fee2e2", icon: XCircle },
};

const ALL_STATUSES = Object.entries(STATUS_CFG).map(([k, v]) => ({ key: k, ...v }));

export function StudentStatus() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [editing,  setEditing]  = useState(null);
  const [newStatus,setNewStatus]= useState("");
  const [note,     setNote]     = useState("");
  const { showToast } = useToast();

  const filtered = students.filter((s) => {
    const matchS = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchF = filter === "all" || s.status === filter;
    return matchS && matchF;
  });

  function startEdit(s) {
    setEditing(s.id);
    setNewStatus(s.status);
    setNote("");
  }

  function saveEdit(id) {
    if (!note.trim()) {
      showToast("warning", "Thiếu ghi chú", "Vui lòng nhập lý do cập nhật trạng thái.");
      return;
    }
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: newStatus } : s
      )
    );
    const sv = students.find((s) => s.id === id);
    showToast("success", "Cập nhật trạng thái thành công", `${sv?.name} → ${STATUS_CFG[newStatus]?.label}`);
    setEditing(null);
  }

  const counts = Object.keys(STATUS_CFG).reduce((acc, k) => {
    acc[k] = students.filter((s) => s.status === k).length;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Trạng thái Học vụ Sinh viên</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Cập nhật trạng thái học vụ: bình thường, cảnh báo, đình chỉ, buộc thôi học — UC13
        </p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {ALL_STATUSES.map(({ key, label, color, bg, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(filter === key ? "all" : key)}
            className="rounded-xl p-3 text-center"
            style={{
              backgroundColor: filter === key ? bg : "#fff",
              border: `1px solid ${filter === key ? color : "#e2e8f0"}`,
              cursor: "pointer",
            }}
          >
            <p style={{ fontSize: "1.3rem", fontWeight: 800, color }}>{counts[key] ?? 0}</p>
            <p style={{ fontSize: "0.7rem", color, fontWeight: 600 }}>{label}</p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center justify-between px-5 py-4 flex-wrap gap-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Danh sách sinh viên ({filtered.length})</p>
          <div style={{ position: "relative" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              placeholder="Tìm MSSV, họ tên…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.82rem", outline: "none", width: 220 }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 800 }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["MSSV", "Họ và tên", "Khoa", "GPA", "TC Tích lũy", "Trạng thái", "Thao tác"].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const cfg  = STATUS_CFG[s.status];
                const Icon = cfg.icon;
                const isEditing = editing === s.id;
                return (
                  <tr key={s.id} style={{ borderTop: "1px solid #f1f5f9", backgroundColor: isEditing ? "#f8fafc" : undefined }}>
                    <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>{s.id}</td>
                    <td className="px-4 py-3" style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{s.name}</td>
                    <td className="px-4 py-3" style={{ fontSize: "0.78rem", color: "#64748b" }}>{s.khoa}</td>
                    <td className="px-4 py-3" style={{ fontSize: "0.88rem", fontWeight: 700, color: s.gpa >= 7 ? "#10b981" : s.gpa >= 5 ? "#f59e0b" : "#ef4444" }}>
                      {s.gpa.toFixed(1)}
                    </td>
                    <td className="px-4 py-3" style={{ fontSize: "0.82rem", color: "#475569" }}>{s.tc} TC</td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          style={{ padding: "4px 8px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.78rem", outline: "none" }}
                        >
                          {ALL_STATUSES.map(({ key, label }) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: "0.7rem", fontWeight: 600 }}>
                          <Icon size={10} /> {cfg.label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <div className="flex flex-col gap-1.5">
                          <input
                            placeholder="Lý do cập nhật *"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            style={{ padding: "4px 8px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.75rem", outline: "none", width: 160 }}
                          />
                          <div className="flex gap-1.5">
                            <button onClick={() => saveEdit(s.id)} style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 8, backgroundColor: "#d1fae5", color: "#065f46", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>
                              <Save size={11} /> Lưu
                            </button>
                            <button onClick={() => setEditing(null)} style={{ padding: "4px 10px", borderRadius: 8, border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.75rem" }}>
                              Hủy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(s)} style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 8, border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.78rem" }}>
                          <Edit2 size={12} color="#2563eb" /> Cập nhật
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentStatus;