import { useState, useEffect } from "react";
import { Search, AlertTriangle, CheckCircle2, XCircle, Save, Loader2 } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import adminStudentService from "../../services/adminStudentService";

const STATUS_CFG = {
  ACTIVE:      { label: "Bình thường",    color: "#10b981", bg: "#d1fae5", icon: CheckCircle2 },
  WARNING:     { label: "Cảnh báo",       color: "#f59e0b", bg: "#fef3c7", icon: AlertTriangle },
  SUSPENDED:   { label: "Đình chỉ",       color: "#dc2626", bg: "#fee2e2", icon: XCircle },
  DROPPED_OUT: { label: "Buộc thôi học",  color: "#7f1d1d", bg: "#fee2e2", icon: XCircle },
  GRADUATED:   { label: "Đã tốt nghiệp", color: "#2563eb", bg: "#dbeafe", icon: CheckCircle2 },
};

const STATUS_OPTIONS = Object.keys(STATUS_CFG);

export function StudentStatus() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await adminStudentService.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast("error", "Lỗi", "Không thể tải danh sách sinh viên");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (studentId) => {
    if (!newStatus) return;
    try {
      setSubmitting(true);
      await adminStudentService.updateStudentStatus(studentId, newStatus);
      showToast("success", "Thành công", "Đã cập nhật trạng thái học vụ");
      setEditing(null);
      setNewStatus("");
      fetchStudents();
    } catch (error) {
      showToast("error", "Lỗi", error.message || "Không thể cập nhật trạng thái");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.studentCode || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterStatus === "all" || s.academicStatus === filterStatus;
    return matchSearch && matchFilter;
  });

  // Counts per status
  const counts = { all: students.length };
  students.forEach((s) => {
    counts[s.academicStatus] = (counts[s.academicStatus] || 0) + 1;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Trạng thái Học vụ Sinh viên</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Quản lý cảnh báo, đình chỉ và buộc thôi học
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus("all")}
          style={{
            padding: "7px 16px", borderRadius: 10, fontSize: "0.82rem",
            backgroundColor: filterStatus === "all" ? "#1a3461" : "#fff",
            color: filterStatus === "all" ? "#fff" : "#64748b",
            border: `1px solid ${filterStatus === "all" ? "#1a3461" : "#e2e8f0"}`,
            cursor: "pointer", fontWeight: filterStatus === "all" ? 600 : 400,
          }}
        >
          Tất cả <span style={{ marginLeft: 4, fontSize: "0.72rem", opacity: 0.8 }}>({counts.all})</span>
        </button>
        {STATUS_OPTIONS.map((key) => {
          const cfg = STATUS_CFG[key];
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
              style={{
                padding: "7px 16px", borderRadius: 10, fontSize: "0.82rem",
                backgroundColor: filterStatus === key ? cfg.bg : "#fff",
                color: filterStatus === key ? cfg.color : "#64748b",
                border: `1px solid ${filterStatus === key ? cfg.color : "#e2e8f0"}`,
                cursor: "pointer", fontWeight: filterStatus === key ? 600 : 400,
              }}
            >
              {cfg.label} <span style={{ marginLeft: 4, fontSize: "0.72rem", opacity: 0.8 }}>({counts[key] || 0})</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center justify-between px-5 py-4 flex-wrap gap-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Danh sách sinh viên ({filtered.length})</p>
          <div style={{ position: "relative" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              placeholder="Tìm SV…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.82rem", outline: "none", width: 220 }}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: 750 }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  {["MSSV", "Họ và tên", "Khoa", "Trạng thái", "Thao tác"].map((h) => (
                    <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-6 text-sm text-slate-500">Không có sinh viên nào</td></tr>
                ) : filtered.map((s) => {
                  const cfg = STATUS_CFG[s.academicStatus] || STATUS_CFG.ACTIVE;
                  const Icon = cfg.icon;
                  const isEditing = editing === s.id;
                  return (
                    <tr key={s.id} style={{ borderTop: "1px solid #f1f5f9", backgroundColor: isEditing ? "#fffbeb" : "transparent" }}>
                      <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#2563eb", fontWeight: 600 }}>{s.studentCode}</td>
                      <td className="px-4 py-3" style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{s.name}</td>
                      <td className="px-4 py-3" style={{ fontSize: "0.78rem", color: "#64748b" }}>{s.departmentName || "—"}</td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="p-1 border rounded text-sm"
                          >
                            <option value="">Chọn trạng thái</option>
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>{STATUS_CFG[opt].label}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="flex items-center gap-1.5 w-fit" style={{ fontSize: "0.72rem", fontWeight: 600, padding: "3px 10px", borderRadius: 9999, backgroundColor: cfg.bg, color: cfg.color }}>
                            <Icon size={12} /> {cfg.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(s.id)}
                              disabled={submitting || !newStatus}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50 cursor-pointer"
                            >
                              <Save size={12} /> Lưu
                            </button>
                            <button
                              onClick={() => { setEditing(null); setNewStatus(""); }}
                              className="px-3 py-1.5 border rounded-lg text-xs cursor-pointer"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditing(s.id); setNewStatus(s.academicStatus); }}
                            className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                          >
                            Đổi trạng thái
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentStatus;