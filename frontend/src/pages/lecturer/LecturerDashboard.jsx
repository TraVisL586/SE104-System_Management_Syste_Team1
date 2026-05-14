import { useNavigate } from "react-router";
import { useRole } from "../../context/RoleContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, Award, CheckSquare, Calendar, ChevronRight, Clock, AlertCircle } from "lucide-react";

const MY_CLASSES = [
  { code: "CSC401-L01", name: "Hệ điều hành",        students: 42, room: "B201", lich: "T2 07:30", pending: true  },
  { code: "CSC401-L02", name: "Hệ điều hành",        students: 38, room: "B202", lich: "T4 09:30", pending: false },
  { code: "CSC420-L01", name: "Trí tuệ Nhân tạo",   students: 45, room: "B305", lich: "T6 09:30", pending: true  },
  { code: "CSC490-G02", name: "Đồ án Tốt nghiệp II", students: 12, room: "—",    lich: "T5 13:30", pending: false },
];

const PERF_DATA = [
  { range: "≥ 8.5", count: 31 },
  { range: "7–8.4", count: 52 },
  { range: "5.5–7", count: 38 },
  { range: "< 5.5", count: 16 },
];

const PERF_COLORS = ["#10b981", "#2563eb", "#f59e0b", "#ef4444"];

const UPCOMING = [
  { time: "Hôm nay 07:30", label: "CSC401-L01 · B201 · 42 SV" },
  { time: "Hôm nay 13:30", label: "Giờ văn phòng · Phòng GV-304" },
  { time: "T4 09:30",      label: "CSC401-L02 · B202 · 38 SV" },
  { time: "T5 13:30",      label: "CSC490 Hướng dẫn ĐA · Phòng GV-304" },
];

export function LecturerDashboard() {
  const { user } = useRole();
  const navigate = useNavigate();
  const totalStudents = MY_CLASSES.reduce((s, c) => s + c.students, 0);

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)" }}
      >
        <div>
          <p style={{ color: "#c4b5fd", fontSize: "0.82rem" }}>Xin chào, Giảng viên 👨‍🏫</p>
          <h1 style={{ color: "white", marginTop: 2 }}>{user?.name}</h1>
          <p style={{ color: "#ddd6fe", fontSize: "0.8rem", marginTop: 4 }}>
            {user?.id} · {user?.department} · HK2 — 2025/2026
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Danh sách lớp",  path: "/lecturer/roster",     icon: Users },
            { label: "Nhập điểm",       path: "/lecturer/grades",     icon: Award },
            { label: "Điểm danh",       path: "/lecturer/attendance", icon: CheckSquare },
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Lớp học phần",    value: MY_CLASSES.length,      sub: "Học kỳ này",           color: "#8b5cf6", bg: "#ede9fe", icon: Award },
          { label: "Tổng sinh viên",  value: totalStudents,          sub: "Đang giảng dạy",        color: "#2563eb", bg: "#dbeafe", icon: Users },
          { label: "Chờ nhập điểm",  value: MY_CLASSES.filter(c=>c.pending).length, sub: "Lớp chưa nhập điểm", color: "#f59e0b", bg: "#fef3c7", icon: AlertCircle },
          { label: "Giờ dạy/tuần",   value: "12 tiết",              sub: "4 lớp · 2 môn",         color: "#10b981", bg: "#d1fae5", icon: Clock },
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
            {MY_CLASSES.map((cls) => (
              <div key={cls.code} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Award size={18} color="#8b5cf6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1e293b" }}>{cls.name}</p>
                      {cls.pending && (
                        <span style={{ fontSize: "0.62rem", backgroundColor: "#fef3c7", color: "#f59e0b", padding: "1px 7px", borderRadius: 9999, fontWeight: 600 }}>
                          Chờ nhập điểm
                        </span>
                      )}
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
          Lịch sắp tới
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {UPCOMING.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ width: 8, height: 8, borderRadius: 9999, backgroundColor: "#8b5cf6", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#8b5cf6" }}>{item.time}</p>
                <p style={{ fontSize: "0.75rem", color: "#334155", marginTop: 2 }}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboard;