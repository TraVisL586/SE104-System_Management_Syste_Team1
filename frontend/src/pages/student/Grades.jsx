import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Award, Download, TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import studentService from "../../services/studentService";

function gradeColor(g) {
  if (g === null || g === undefined) return "#94a3b8";
  if (g >= 8.5) return "#10b981";
  if (g >= 7.0) return "#2563eb";
  if (g >= 5.5) return "#f59e0b";
  return "#ef4444";
}

function gradeLabel(g) {
  if (g === null || g === undefined) return "Chưa có";
  if (g >= 8.5) return "Giỏi";
  if (g >= 7.0) return "Khá";
  if (g >= 5.5) return "TB Khá";
  if (g >= 4.0) return "Trung bình";
  return "Không đạt";
}

export function Grades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await studentService.getMyGrades();
      // Filter only published grades
      const publishedGrades = data.filter(g => g.status === "PUBLISHED" || g.isPublished || g.gradeStatus === "PUBLISHED");
      setGrades(publishedGrades || []);
    } catch (error) {
      showToast("error", "Lỗi", "Không thể tải bảng điểm");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  let totalCredits = 0;
  let totalScorePoints = 0;
  let passedCourses = 0;
  let failedCourses = 0;

  grades.forEach(g => {
    const credits = g.credits || 3; // Default 3 credits if not provided
    totalCredits += credits;
    if (g.totalScore !== null && g.totalScore !== undefined) {
      totalScorePoints += (g.totalScore * credits);
      if (g.totalScore >= 4.0) passedCourses++;
      else failedCourses++;
    }
  });

  const cumulativeGPA = totalCredits > 0 ? (totalScorePoints / totalCredits) : 0;

  // Chart data (mocking semesters for now since semester info isn't in GradeResponse)
  const GPA_CHART = [
    { ky: "HK1/23", gpa: 7.2 },
    { ky: "HK2/23", gpa: 7.5 },
    { ky: "HK1/24", gpa: 7.8 },
    { ky: "HK2/24", gpa: 8.1 },
    { ky: "HK1/25", gpa: 7.9 },
    { ky: "Hiện tại", gpa: parseFloat(cumulativeGPA.toFixed(2)) || 0 },
  ];

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

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "GPA Tích lũy",    value: cumulativeGPA.toFixed(2), sub: `Xếp loại: ${gradeLabel(cumulativeGPA)}`,   color: "#2563eb", bg: "#dbeafe" },
              { label: "Tín chỉ Tích lũy",value: `${totalCredits}/130`,    sub: `${Math.round((totalCredits/130)*100)}% chương trình`, color: "#10b981", bg: "#d1fae5" },
              { label: "Môn đạt",          value: passedCourses.toString(),                     sub: `Tổng ${grades.length} môn đã học`, color: "#8b5cf6", bg: "#ede9fe" },
              { label: "Môn chưa đạt",     value: failedCourses.toString(),                      sub: failedCourses > 0 ? "Cần học lại" : "Rất tốt",       color: "#f59e0b", bg: "#fef3c7" },
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
                  <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
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
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Chi tiết các môn học (Đã công bố)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      {["Mã MH", "Tên môn học", "Quá trình (20%)", "Giữa kỳ (30%)", "Cuối kỳ (50%)", "Tổng kết", "Xếp loại"].map((h) => (
                        <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: "0.62rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grades.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-6 text-sm text-slate-500">Chưa có điểm nào được công bố.</td>
                      </tr>
                    ) : grades.map((c) => (
                      <tr key={c.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                        <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#2563eb", fontWeight: 600 }}>{c.courseCode}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.82rem", color: "#1e293b" }}>{c.courseName}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.85rem", fontWeight: 600, color: gradeColor(c.processScore) }}>{c.processScore ?? "—"}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.85rem", fontWeight: 600, color: gradeColor(c.midtermScore) }}>{c.midtermScore ?? "—"}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.85rem", fontWeight: 600, color: gradeColor(c.finalScore) }}>{c.finalScore ?? "—"}</td>
                        <td className="px-4 py-3" style={{ fontSize: "0.95rem", fontWeight: 700, color: gradeColor(c.totalScore) }}>{c.totalScore ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span style={{
                            fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                            backgroundColor: c.totalScore !== null ? `${gradeColor(c.totalScore)}18` : "#f1f5f9",
                            color: gradeColor(c.totalScore),
                          }}>
                            {gradeLabel(c.totalScore)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Grades;