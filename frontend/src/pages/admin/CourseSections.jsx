import { useState } from "react";
import { Plus, Search, Edit2, Trash2, BookMarked, Users, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const INITIAL = [
  { id: "CS001", code: "CSC401-L01", name: "Hệ điều hành",        gv: "GS. Nguyễn Văn An",  room: "B201", lich: "T2 07:30", max: 50, enrolled: 42, status: "open"   },
  { id: "CS002", code: "CSC401-L02", name: "Hệ điều hành",        gv: "GS. Nguyễn Văn An",  room: "B202", lich: "T4 09:30", max: 50, enrolled: 38, status: "open"   },
  { id: "CS003", code: "CSC420-L01", name: "Trí tuệ Nhân tạo",   gv: "GS. Trần Minh Tú",   room: "B305", lich: "T6 09:30", max: 50, enrolled: 45, status: "open"   },
  { id: "CS004", code: "MTH302-L01", name: "Xác suất Thống kê",   gv: "TS. Lê Thị Bình",    room: "A105", lich: "T3 09:30", max: 60, enrolled: 58, status: "open"   },
  { id: "CS005", code: "CSC501-L01", name: "Học máy",             gv: "TS. Phạm Ngọc Anh",  room: "B401", lich: "T5 13:30", max: 35, enrolled: 28, status: "open"   },
  { id: "CS006", code: "CSC490-G01", name: "Đồ án TN I",          gv: "PGS. Hoàng Văn Đức", room: "—",    lich: "T5 07:30", max: 20, enrolled: 20, status: "full"   },
  { id: "CS007", code: "ENG201-L01", name: "Tiếng Anh CN",        gv: "ThS. Nguyễn Thị Dung",room:"D102",lich: "T2 13:30", max: 45, enrolled: 44, status: "open"   },
  { id: "CS008", code: "CSC302-L01", name: "CSDL Nâng cao",       gv: "TS. Lê Văn Hải",     room: "C301", lich: "T6 13:30", max: 50, enrolled: 0,  status: "closed" },
];

const STATUS_CFG = {
  open:   { label: "Đang mở",  color: "#10b981", bg: "#d1fae5" },
  full:   { label: "Đã đầy",   color: "#f59e0b", bg: "#fef3c7" },
  closed: { label: "Đã đóng",  color: "#64748b", bg: "#f1f5f9" },
};

export function CourseSections() {
  const [sections, setSections] = useState(INITIAL);
  const [search,   setSearch]   = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ code: "", name: "", gv: "", room: "", lich: "", max: 50 });
  const { showToast }           = useToast();

  const filtered = sections.filter(
    (s) =>
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.gv.toLowerCase().includes(search.toLowerCase())
  );

  function toggleStatus(id) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "open" ? "closed" : "open" }
          : s
      )
    );
    const s = sections.find((x) => x.id === id);
    showToast("success", "Cập nhật trạng thái", `${s?.code} — ${s?.status === "open" ? "Đã đóng" : "Đã mở"}`);
  }

  function deleteSection(id) {
    const s = sections.find((x) => x.id === id);
    setSections((prev) => prev.filter((x) => x.id !== id));
    showToast("info", "Đã xóa lớp học phần", s?.code);
  }

  function addSection(e) {
    e.preventDefault();
    const newSection = {
      id: `CS${Date.now()}`,
      ...form,
      max: parseInt(form.max),
      enrolled: 0,
      status: "open",
    };
    setSections((prev) => [newSection, ...prev]);
    showToast("success", "Tạo lớp học phần thành công!", form.code);
    setForm({ code: "", name: "", gv: "", room: "", lich: "", max: 50 });
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ color: "#1e293b" }}>Quản lý Lớp học phần</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
            Mở, đóng và quản lý các lớp học phần — UC10
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: "#065f46", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
        >
          <Plus size={16} /> Thêm lớp học phần
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <p style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b", marginBottom: 16 }}>Thêm lớp học phần mới</p>
          <form onSubmit={addSection} className="grid grid-cols-2 gap-4">
            {[
              { key: "code",  label: "Mã lớp HP",       placeholder: "VD: CSC501-L02" },
              { key: "name",  label: "Tên môn học",      placeholder: "VD: Học máy" },
              { key: "gv",    label: "Giảng viên",       placeholder: "VD: TS. Nguyễn Văn A" },
              { key: "room",  label: "Phòng học",        placeholder: "VD: B401" },
              { key: "lich",  label: "Lịch học",         placeholder: "VD: T2 07:30" },
              { key: "max",   label: "Sĩ số tối đa",     placeholder: "50", type: "number" },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 5 }}>{label}</label>
                <input
                  required
                  type={type ?? "text"}
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: "100%", padding: "8px 11px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
                />
              </div>
            ))}
            <div className="col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "8px 18px", borderRadius: 10, border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.85rem" }}>Hủy</button>
              <button type="submit" style={{ padding: "8px 18px", borderRadius: 10, backgroundColor: "#065f46", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>Tạo lớp</button>
            </div>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Đang mở",  value: sections.filter((s) => s.status === "open").length,   color: "#10b981", bg: "#d1fae5" },
          { label: "Đã đầy",   value: sections.filter((s) => s.status === "full").length,   color: "#f59e0b", bg: "#fef3c7" },
          { label: "Đã đóng",  value: sections.filter((s) => s.status === "closed").length, color: "#64748b", bg: "#f1f5f9" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ backgroundColor: bg }}>
            <p style={{ fontSize: "1.4rem", fontWeight: 800, color }}>{value}</p>
            <p style={{ fontSize: "0.72rem", color, fontWeight: 600 }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center justify-between px-5 py-4 flex-wrap gap-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Danh sách lớp học phần ({filtered.length})</p>
          <div style={{ position: "relative" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              placeholder="Tìm mã, tên môn, GV…"
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
                {["Mã lớp HP", "Môn học", "Giảng viên", "Lịch / Phòng", "Sĩ số", "Trạng thái", "Thao tác"].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const cfg = STATUS_CFG[s.status];
                return (
                  <tr key={s.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#10b981", fontWeight: 700 }}>{s.code}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BookMarked size={14} color="#8b5cf6" />
                        <span style={{ fontSize: "0.85rem", color: "#1e293b" }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ fontSize: "0.78rem", color: "#64748b" }}>{s.gv}</td>
                    <td className="px-4 py-3">
                      <p style={{ fontSize: "0.78rem", color: "#1e293b" }}>{s.lich}</p>
                      <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{s.room}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Users size={13} color="#94a3b8" />
                        <span style={{ fontSize: "0.82rem", color: "#1e293b" }}>{s.enrolled}/{s.max}</span>
                      </div>
                      <div style={{ height: 4, backgroundColor: "#e2e8f0", borderRadius: 9999, marginTop: 4, width: 60, overflow: "hidden" }}>
                        <div style={{ width: `${(s.enrolled / s.max) * 100}%`, height: "100%", backgroundColor: s.enrolled >= s.max ? "#ef4444" : "#10b981", borderRadius: 9999 }} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "3px 9px", borderRadius: 9999, backgroundColor: cfg.bg, color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => toggleStatus(s.id)}
                          title={s.status === "open" ? "Đóng lớp" : "Mở lớp"}
                          style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #e2e8f0", background: "none", cursor: "pointer" }}
                        >
                          {s.status === "open" ? <XCircle size={14} color="#ef4444" /> : <CheckCircle2 size={14} color="#10b981" />}
                        </button>
                        <button
                          title="Chỉnh sửa"
                          style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #e2e8f0", background: "none", cursor: "pointer" }}
                        >
                          <Edit2 size={14} color="#2563eb" />
                        </button>
                        <button
                          onClick={() => deleteSection(s.id)}
                          title="Xóa"
                          style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #e2e8f0", background: "none", cursor: "pointer" }}
                        >
                          <Trash2 size={14} color="#ef4444" />
                        </button>
                      </div>
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

export default CourseSections;