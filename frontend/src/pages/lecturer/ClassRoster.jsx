import { useState } from "react";
import { Search, Users, Download, ChevronDown } from "lucide-react";

const CLASSES = [
  { code: "CSC401-L01", name: "Hệ điều hành (L01)",       students: 42 },
  { code: "CSC401-L02", name: "Hệ điều hành (L02)",       students: 38 },
  { code: "CSC420-L01", name: "Trí tuệ Nhân tạo (L01)", students: 45 },
  { code: "CSC490-G02", name: "Đồ án Tốt nghiệp II",    students: 12 },
];

const genStudents = (n, classCode) =>
  Array.from({ length: n }, (_, i) => ({
    id:   `SV.2023.${String(i + 1).padStart(5, "0")}`,
    name: ["Nguyễn Thị Lan","Trần Văn Bình","Lê Minh Châu","Phạm Thu Dung","Hoàng Văn Em",
           "Vũ Thị Phượng","Đỗ Quang Giang","Bùi Thị Hoa","Ngô Văn Inh","Đinh Thị Kim"][i % 10],
    email: `sv${i + 1}@student.edu.vn`,
    gpa:  (6.5 + Math.random() * 3).toFixed(1),
    status: ["active","active","active","warning"][i % 4],
    classCode,
  }));

const ALL_STUDENTS = {
  "CSC401-L01": genStudents(42, "CSC401-L01"),
  "CSC401-L02": genStudents(38, "CSC401-L02"),
  "CSC420-L01": genStudents(45, "CSC420-L01"),
  "CSC490-G02": genStudents(12, "CSC490-G02"),
};

const STATUS = {
  active:  { label: "Bình thường", color: "#10b981", bg: "#d1fae5" },
  warning: { label: "Cảnh báo",    color: "#f59e0b", bg: "#fef3c7" },
};

export function ClassRoster() {
  const [selected, setSelected] = useState("CSC401-L01");
  const [search,   setSearch]   = useState("");

  const students = (ALL_STUDENTS[selected] ?? []).filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  const cls = CLASSES.find((c) => c.code === selected);

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Danh sách Lớp</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Xem danh sách sinh viên đã đăng ký từng lớp học phần
        </p>
      </div>

      {/* Class selector */}
      <div className="flex flex-wrap gap-2">
        {CLASSES.map((cls) => (
          <button
            key={cls.code}
            onClick={() => setSelected(cls.code)}
            style={{
              padding: "8px 16px", borderRadius: 12, fontSize: "0.82rem",
              backgroundColor: selected === cls.code ? "#4c1d95" : "#fff",
              color: selected === cls.code ? "#fff" : "#334155",
              border: `1px solid ${selected === cls.code ? "#4c1d95" : "#e2e8f0"}`,
              cursor: "pointer", fontWeight: selected === cls.code ? 600 : 400,
            }}
          >
            {cls.code}
            <span style={{ marginLeft: 6, opacity: 0.7, fontSize: "0.72rem" }}>({cls.students})</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>{cls?.name}</p>
            <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{students.length} sinh viên</p>
          </div>
          <div className="flex gap-2">
            <div style={{ position: "relative" }}>
              <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
              <input
                placeholder="Tìm sinh viên…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.82rem", outline: "none", width: 200 }}
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.78rem", color: "#475569" }}>
              <Download size={13} /> Xuất
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["#", "MSSV", "Họ và tên", "Email", "GPA", "Trạng thái"].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => {
                const st = STATUS[s.status] ?? STATUS.active;
                return (
                  <tr key={s.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td className="px-4 py-3" style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{i + 1}</td>
                    <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600 }}>{s.id}</td>
                    <td className="px-4 py-3" style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{s.name}</td>
                    <td className="px-4 py-3" style={{ fontSize: "0.78rem", color: "#64748b" }}>{s.email}</td>
                    <td className="px-4 py-3" style={{ fontSize: "0.88rem", fontWeight: 700, color: parseFloat(s.gpa) >= 8 ? "#10b981" : parseFloat(s.gpa) >= 6.5 ? "#2563eb" : "#f59e0b" }}>
                      {s.gpa}
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 9999, backgroundColor: st.bg, color: st.color }}>
                        {st.label}
                      </span>
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

export default ClassRoster;