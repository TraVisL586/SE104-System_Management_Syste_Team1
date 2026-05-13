import { useState } from "react";
import { FolderOpen, ChevronDown, ChevronRight, BookOpen, Plus, Edit2 } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const PROGRAMS = [
  {
    id: "CNTT-KS",
    name: "Kỹ sư CNTT",
    khoa: "Khoa CNTT",
    credits: 130,
    years: 4,
    status: "active",
    semesters: [
      {
        sem: "HK1 – Năm 1",
        courses: [
          { code: "MTH101", name: "Đại số Tuyến tính",        tc: 3, type: "required" },
          { code: "MTH102", name: "Giải tích I",              tc: 3, type: "required" },
          { code: "CSC101", name: "Nhập môn Lập trình",       tc: 3, type: "required" },
          { code: "GEN101", name: "Triết học Mác-Lê",         tc: 3, type: "general"  },
          { code: "PHY101", name: "Vật lý Đại cương",         tc: 3, type: "required" },
        ],
      },
      {
        sem: "HK2 – Năm 1",
        courses: [
          { code: "MTH201", name: "Giải tích II",             tc: 3, type: "required" },
          { code: "CSC201", name: "LTLT Hướng đối tượng",     tc: 3, type: "required" },
          { code: "CSC202", name: "Hệ quản trị CSDL",         tc: 3, type: "required" },
          { code: "ENG101", name: "Tiếng Anh 1",              tc: 3, type: "general"  },
        ],
      },
    ],
  },
  {
    id: "CNTT-CU",
    name: "Cử nhân Khoa học Máy tính",
    khoa: "Khoa CNTT",
    credits: 125,
    years: 4,
    status: "active",
    semesters: [],
  },
  {
    id: "KINH-CU",
    name: "Cử nhân Kinh tế",
    khoa: "Khoa Kinh tế",
    credits: 120,
    years: 4,
    status: "draft",
    semesters: [],
  },
];

const TYPE_CFG = {
  required: { label: "Bắt buộc",     color: "#2563eb", bg: "#dbeafe" },
  general:  { label: "Đại cương",    color: "#8b5cf6", bg: "#ede9fe" },
  elective: { label: "Tự chọn",      color: "#10b981", bg: "#d1fae5" },
};

export function CurriculumMgmt() {
  const [selected, setSelected] = useState("CNTT-KS");
  const [expanded, setExpanded] = useState(["HK1 – Năm 1"]);
  const { showToast } = useToast();

  const prog = PROGRAMS.find((p) => p.id === selected);

  function toggleSem(sem) {
    setExpanded((prev) =>
      prev.includes(sem) ? prev.filter((s) => s !== sem) : [...prev, sem]
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Quản lý Chương trình Đào tạo</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Xem và cập nhật chương trình đào tạo theo từng ngành — UC12
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Program list */}
        <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e293b" }}>Chương trình ĐT</p>
            <button style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, backgroundColor: "#d1fae5", border: "none", cursor: "pointer" }}>
              <Plus size={14} color="#10b981" />
            </button>
          </div>
          <div className="p-2">
            {PROGRAMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className="w-full flex items-start gap-2.5 px-3 py-3 rounded-xl text-left"
                style={{
                  backgroundColor: selected === p.id ? "#f0fdf4" : "transparent",
                  border: `1px solid ${selected === p.id ? "#10b981" : "transparent"}`,
                  cursor: "pointer",
                  marginBottom: 2,
                }}
              >
                <FolderOpen size={16} color={selected === p.id ? "#10b981" : "#94a3b8"} style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: selected === p.id ? "#065f46" : "#334155" }}>{p.name}</p>
                  <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{p.credits} TC · {p.years} năm</p>
                  <span style={{
                    fontSize: "0.62rem", fontWeight: 600, padding: "1px 7px", borderRadius: 9999, marginTop: 3, display: "inline-block",
                    backgroundColor: p.status === "active" ? "#d1fae5" : "#fef3c7",
                    color: p.status === "active" ? "#10b981" : "#f59e0b",
                  }}>
                    {p.status === "active" ? "Đang áp dụng" : "Dự thảo"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Curriculum detail */}
        <div className="lg:col-span-3 space-y-3">
          {prog && (
            <>
              <div className="rounded-2xl p-5 flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
                <div>
                  <h2 style={{ color: "#1e293b" }}>{prog.name}</h2>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>
                    {prog.khoa} · {prog.credits} tín chỉ · {prog.years} năm học · {prog.semesters.length} học kỳ có dữ liệu
                  </p>
                </div>
                <button
                  onClick={() => showToast("info", "Chỉnh sửa chương trình", prog.name)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ backgroundColor: "#d1fae5", color: "#065f46", border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}
                >
                  <Edit2 size={14} /> Chỉnh sửa
                </button>
              </div>

              {prog.semesters.length === 0 ? (
                <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
                  <BookOpen size={32} color="#cbd5e1" style={{ margin: "0 auto 10px" }} />
                  <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Chương trình chưa có dữ liệu môn học.</p>
                  <button onClick={() => showToast("info", "Thêm học kỳ", prog.name)} style={{ marginTop: 12, padding: "7px 18px", borderRadius: 10, backgroundColor: "#065f46", color: "white", border: "none", cursor: "pointer", fontSize: "0.82rem" }}>
                    + Thêm học kỳ
                  </button>
                </div>
              ) : (
                prog.semesters.map((sem) => {
                  const isOpen = expanded.includes(sem.sem);
                  const totalTC = sem.courses.reduce((s, c) => s + c.tc, 0);
                  return (
                    <div key={sem.sem} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
                      <button
                        onClick={() => toggleSem(sem.sem)}
                        className="w-full flex items-center justify-between px-5 py-4"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                      >
                        <div className="flex items-center gap-3">
                          {isOpen ? <ChevronDown size={16} color="#10b981" /> : <ChevronRight size={16} color="#94a3b8" />}
                          <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "#1e293b" }}>{sem.sem}</p>
                          <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{sem.courses.length} môn · {totalTC} TC</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); showToast("info", "Thêm môn học", sem.sem); }}
                          style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 8, backgroundColor: "#d1fae5", color: "#065f46", border: "none", cursor: "pointer", fontSize: "0.72rem" }}
                        >
                          <Plus size={11} /> Thêm môn
                        </button>
                      </button>
                      {isOpen && (
                        <div className="overflow-x-auto" style={{ borderTop: "1px solid #f1f5f9" }}>
                          <table className="w-full">
                            <thead>
                              <tr style={{ backgroundColor: "#f8fafc" }}>
                                {["Mã MH", "Tên môn học", "Tín chỉ", "Loại", ""].map((h) => (
                                  <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: "0.62rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sem.courses.map((c) => {
                                const type = TYPE_CFG[c.type];
                                return (
                                  <tr key={c.code} style={{ borderTop: "1px solid #f8fafc" }}>
                                    <td className="px-4 py-2.5" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>{c.code}</td>
                                    <td className="px-4 py-2.5" style={{ fontSize: "0.82rem", color: "#1e293b" }}>{c.name}</td>
                                    <td className="px-4 py-2.5" style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>{c.tc}</td>
                                    <td className="px-4 py-2.5">
                                      <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: 6, backgroundColor: type.bg, color: type.color }}>{type.label}</span>
                                    </td>
                                    <td className="px-4 py-2.5">
                                      <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                                        <Edit2 size={13} color="#94a3b8" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurriculumMgmt;