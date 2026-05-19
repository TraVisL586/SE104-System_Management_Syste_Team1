import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRole } from "../../context/RoleContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, Award, CheckSquare, Calendar, ChevronRight, Clock, AlertCircle, Loader2 } from "lucide-react";
import lecturerService from "../../services/lecturerService";

const PERF_DATA = [
  { range: "≥ 8.5", count: 31 },
  { range: "7–8.4", count: 52 },
  { range: "5.5–7", count: 38 },
  { range: "< 5.5", count: 16 },
];

const PERF_COLORS = ["#10b981", "#2563eb", "#f59e0b", "#ef4444"];

export function LecturerDashboard() {
  const { user } = useRole();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const ttData = await lecturerService.getMyTimetable();
      setTimetable(ttData);

      const uniqueClasses = [];
      const seen = new Set();
      ttData.forEach(item => {
        if (!seen.has(item.sectionId)) {
          seen.add(item.sectionId);
          uniqueClasses.push({
            id: item.sectionId,
            code: item.sectionCode || item.courseCode,
            name: item.courseName,
            students: item.enrolledCount || 0,
            room: item.room,
            lich: `${item.dayOfWeek} ${item.startTime}`
          });
        }
      });
      setClasses(uniqueClasses);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalStudents = classes.reduce((s, c) => s + c.students, 0);

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)" }}
      >
        <div>
          <p style={{ color: "#c4b5fd", fontSize: "0.82rem" }}>Xin chào, Giảng viên 👨‍🏫</p>
          <h1 style={{ color: "white", marginTop: 2 }}>{user?.name || "Giảng viên"}</h1>
          <p style={{ color: "#ddd6fe", fontSize: "0.8rem", marginTop: 4 }}>
            {user?.email}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Lịch dạy", path: "/lecturer/timetable", icon: Calendar },
            { label: "Danh sách lớp",  path: "/lecturer/roster",     icon: Users },
            { label: "Nhập điểm",       path: "/lecturer/grades",     icon: Award },
          ].map(({ label, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-purple-600" size={32} />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Lớp học phần",    value: classes.length,      sub: "Học kỳ này",           color: "#8b5cf6", bg: "#ede9fe", icon: Award },
              { label: "Tổng sinh viên",  value: totalStudents,          sub: "Đang giảng dạy",        color: "#2563eb", bg: "#dbeafe", icon: Users },
              { label: "Lịch dạy",  value: timetable.length, sub: "Buổi dạy / tuần", color: "#f59e0b", bg: "#fef3c7", icon: Calendar },
              { label: "Giờ dạy/tuần",   value: `${timetable.length * 2} tiết`,              sub: `${classes.length} lớp`,         color: "#10b981", bg: "#d1fae5", icon: Clock },
            ].map(({ label, value, sub, color, bg, icon: Icon }) => (
              <div key={label} className="rounded-2xl p-4" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
                <div className="flex items-center justify-between mb-3">
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{label}</p>
                  <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={16} color={color} />
                  </div>
                </div>
                <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>{value}</p>
                <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 2 }}>{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Performance chart */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", marginBottom: 2 }}>Phân phối điểm SV</p>
              <p style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 14 }}>Tổng hợp tất cả lớp · Thang 10.0</p>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={PERF_DATA} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: "0.78rem" }} formatter={(v) => [`${v} SV`, "Số lượng"]} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {PERF_DATA.map((_, i) => (
                      <Cell key={i} fill={PERF_COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Classes */}
            <div className="lg:col-span-2 rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Lớp học phần của tôi</p>
                <button
                  onClick={() => navigate("/lecturer/roster")}
                  className="flex items-center gap-1"
                  style={{ fontSize: "0.72rem", color: "#8b5cf6", background: "none", border: "none", cursor: "pointer" }}
                >
                  Xem danh sách <ChevronRight size={13} />
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
                {classes.length === 0 ? (
                  <div className="px-5 py-8 text-center text-slate-500 text-sm">Chưa có lớp học phần nào</div>
                ) : classes.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Award size={18} color="#8b5cf6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1e293b" }}>{cls.name}</p>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{cls.code} · {cls.lich} · {cls.room}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p style={{ fontWeight: 700, color: "#1e293b" }}>{cls.students}</p>
                      <p style={{ fontSize: "0.7rem", color: "#94a3b8" }}>sinh viên</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", marginBottom: 14 }}>
              Lịch dạy tuần này
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {timetable.length === 0 ? (
                <div className="col-span-full text-slate-500 text-sm">Chưa có lịch dạy</div>
              ) : timetable.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 9999, backgroundColor: "#8b5cf6", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#8b5cf6" }}>{item.dayOfWeek} {item.startTime}</p>
                    <p style={{ fontSize: "0.75rem", color: "#334155", marginTop: 2 }}>{item.courseCode} · {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LecturerDashboard;