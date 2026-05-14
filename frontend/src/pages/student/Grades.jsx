import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Award, Download, TrendingUp } from "lucide-react";

const SEMESTERS = [
  {
    id: "hk2-2526", label: "HK2 2025-2026", gpa: null, credits: 17,
    courses: [
      { code: "CSC401", name: "Hệ điều hành",          tc: 3, giuaky: 8.5, cuoiky: null,  tongket: null },
      { code: "MTH302", name: "Xác suất Thống kê",      tc: 3, giuaky: 7.0, cuoiky: null,  tongket: null },
      { code: "CSC312", name: "Mạng máy tính",           tc: 3, giuaky: 9.0, cuoiky: null,  tongket: null },
      { code: "ENG201", name: "Tiếng Anh Chuyên ngành",  tc: 2, giuaky: 7.5, cuoiky: null,  tongket: null },
      { code: "CSC420", name: "Trí tuệ Nhân tạo",        tc: 3, giuaky: 8.0, cuoiky: null,  tongket: null },
      { code: "CSC380", name: "Kiểm thử Phần mềm",       tc: 3, giuaky: 8.5, cuoiky: null,  tongket: null },
    ],
  },
  {
    id: "hk1-2526", label: "HK1 2025-2026", gpa: 7.90, credits: 18,
    courses: [
      { code: "CSC301", name: "Cấu trúc Dữ liệu",       tc: 3, giuaky: 7.5, cuoiky: 8.0,  tongket: 7.85 },
      { code: "MTH201", name: "Giải tích",               tc: 3, giuaky: 6.5, cuoiky: 7.0,  tongket: 6.85 },
      { code: "CSC302", name: "CSDL Nâng cao",           tc: 3, giuaky: 8.5, cuoiky: 8.5,  tongket: 8.50 },
      { code: "CSC303", name: "Lập trình Web",            tc: 3, giuaky: 9.0, cuoiky: 9.5,  tongket: 9.30 },
      { code: "ENG101", name: "Tiếng Anh 3",              tc: 2, giuaky: 8.0, cuoiky: 8.5,  tongket: 8.30 },
      { code: "CSC304", name: "Kiến trúc Phần mềm",      tc: 4, giuaky: 7.0, cuoiky: 7.5,  tongket: 7.30 },
    ],
  },
  {
    id: "hk2-2425", label: "HK2 2024-2025", gpa: 8.10, credits: 18,
    courses: [
      { code: "CSC201", name: "Lập trình Hướng đối tượng", tc: 3, giuaky: 8.0, cuoiky: 8.5, tongket: 8.30 },
      { code: "CSC202", name: "Hệ quản trị CSDL",           tc: 3, giuaky: 8.5, cuoiky: 9.0, tongket: 8.80 },
      { code: "MTH101", name: "Đại số Tuyến tính",           tc: 3, giuaky: 7.0, cuoiky: 7.5, tongket: 7.30 },
      { code: "CSC203", name: "Phân tích TK Hệ thống",       tc: 4, giuaky: 8.5, cuoiky: 8.0, tongket: 8.20 },
      { code: "PHY101", name: "Vật lý Đại cương",             tc: 3, giuaky: 7.5, cuoiky: 8.0, tongket: 7.80 },
      { code: "ENG102", name: "Tiếng Anh 2",                  tc: 2, giuaky: 9.0, cuoiky: 9.5, tongket: 9.30 },
    ],
  },
];

const GPA_CHART = [
  { ky: "HK1/23", gpa: 7.2 },
  { ky: "HK2/23", gpa: 7.5 },
  { ky: "HK1/24", gpa: 7.8 },
  { ky: "HK2/24", gpa: 8.1 },
  { ky: "HK1/25", gpa: 7.9 },
  { ky: "HK2/25", gpa: 8.3 },
];

function gradeColor(g) {
  if (g === null) return "#94a3b8";
  if (g >= 8.5) return "#10b981";
  if (g >= 7.0) return "#2563eb";
  if (g >= 5.5) return "#f59e0b";
  return "#ef4444";
}

function gradeLabel(g) {
  if (g === null) return "Chưa có";
  if (g >= 8.5) return "Giỏi";
  if (g >= 7.0) return "Khá";
  if (g >= 5.5) return "TB Khá";
  if (g >= 4.0) return "Trung bình";
  return "Không đạt";
}

export function Grades() {
  const [selected, setSelected] = useState("hk1-2526");
  const sem = SEMESTERS.find((s) => s.id === selected);

  const cumulativeGPA = 8.30;
  const totalCredits  = 86;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ color: "#1e293b" }}>Bảng điểm</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
            Thang điểm 0.0 – 10.0 (BR-8) · Tích lũy: {totalCredits}/130 TC
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ backgroundColor: "#1a3461", color: "white", border: "none", cursor: "pointer", fontSize: "0.82rem" }}
        >
          <Download size={14} /> Tải bảng điểm PDF
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "GPA Tích lũy",    value: cumulativeGPA.toFixed(2), sub: "Xếp loại: Giỏi",   color: "#2563eb", bg: "#dbeafe" },
          { label: "Tín chỉ Tích lũy",value: `${totalCredits}/130`,    sub: "66% chương trình", color: "#10b981", bg: "#d1fae5" },
          { label: "Môn đạt",          value: "28",                     sub: "Tổng 30 môn đã học", color: "#8b5cf6", bg: "#ede9fe" },
          { label: "Môn chưa đạt",     value: "2",                      sub: "Cần học lại",       color: "#f59e0b", bg: "#fef3c7" },
        ].map(({ label, value, sub, color, bg }) => (
          <div key={label} className="rounded-2xl p-4" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <Award size={15} color={color} />
            </div>
            <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e293b" }}>{value}</p>
            <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{label}</p>
            <p style={{ fontSize: "0.68rem", color, fontWeight: 600, marginTop: 2 }}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* GPA Chart */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} color="#2563eb" />
            <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "#1e293b" }}>Biểu đồ GPA</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={GPA_CHART} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="ky" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <YAxis domain={[6, 10]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{ borderRadius: 10, fontSize: "0.78rem" }}
                formatter={(v) => [`${v}`, "GPA"]}
              />
              <Bar dataKey="gpa" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Semester detail */}
        <div className="lg:col-span-2 rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          {/* Semester tabs */}
          <div className="flex gap-1 px-4 pt-4 pb-0 overflow-x-auto" style={{ borderBottom: "1px solid #f1f5f9" }}>
            {SEMESTERS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  padding: "8px 14px", borderRadius: "10px 10px 0 0",
                  fontSize: "0.78rem", fontWeight: selected === s.id ? 700 : 400,
                  backgroundColor: selected === s.id ? "#1a3461" : "transparent",
                  color: selected === s.id ? "white" : "#64748b",
                  border: "none", cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                {s.label}
                {s.gpa && (
                  <span style={{ marginLeft: 6, fontSize: "0.68rem", opacity: 0.8 }}>
                    ({s.gpa})
                  </span>
                )}
              </button>
            ))}
          </div>

          {sem && (
            <>
              {sem.gpa && (
                <div className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid #f1f5f9", backgroundColor: "#f8fafc" }}>
                  <div>
                    <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>GPA học kỳ</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#2563eb" }}>{sem.gpa}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Tín chỉ</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e293b" }}>{sem.credits}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Xếp loại</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#10b981" }}>{gradeLabel(sem.gpa)}</p>
                  </div>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      {["Mã MH", "Tên môn học", "TC", "Giữa kỳ (30%)", "Cuối kỳ (70%)", "Tổng kết", "Xếp loại"].map((h) => (
                        <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: "0.62rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sem.courses.map((c) => (
                      <tr key={c.code} style={{ borderTop: "1px solid #f1f5f9" }}>
                        <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#2563eb", fontWeight: 600 }}>{c.code}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.82rem", color: "#1e293b" }}>{c.name}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.78rem", color: "#64748b" }}>{c.tc}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.85rem", fontWeight: 600, color: gradeColor(c.giuaky) }}>{c.giuaky ?? "—"}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.85rem", fontWeight: 600, color: gradeColor(c.cuoiky) }}>{c.cuoiky ?? "—"}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.95rem", fontWeight: 700, color: gradeColor(c.tongket) }}>{c.tongket ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span style={{
                            fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                            backgroundColor: c.tongket ? `${gradeColor(c.tongket)}18` : "#f1f5f9",
                            color: gradeColor(c.tongket),
                          }}>
                            {gradeLabel(c.tongket)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Grades;