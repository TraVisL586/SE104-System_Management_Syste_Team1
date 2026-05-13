import { useNavigate } from "react-router";
import { useRole } from "../../context/RoleContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Users, BookMarked, FolderOpen, AlertTriangle, CalendarRange, TrendingUp, ChevronRight } from "lucide-react";

const ENROLL_DATA = [
  { month: "T9/25", new: 1820, leave: 45 },
  { month: "T10/25",new: 320,  leave: 28 },
  { month: "T11/25",new: 180,  leave: 31 },
  { month: "T12/25",new: 90,   leave: 40 },
  { month: "T1/26", new: 70,   leave: 22 },
  { month: "T2/26", new: 240,  leave: 18 },
  { month: "T3/26", new: 110,  leave: 25 },
  { month: "T4/26", new: 85,   leave: 14 },
  { month: "T5/26", new: 60,   leave: 9  },
];

const DEPT_DATA = [
  { name: "CNTT",       value: 1842 },
  { name: "Kinh tế",    value: 1523 },
  { name: "Kỹ thuật",   value: 1210 },
  { name: "Ngoại ngữ",  value: 987  },
  { name: "Y Dược",     value: 756  },
];
const DEPT_COLORS = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

const RECENT_LOGS = [
  { time: "08:42", action: "Mở lớp học phần CSC501-L03",   actor: "Admin", type: "create" },
  { time: "08:15", action: "Cập nhật TKB tuần 19",          actor: "Admin", type: "update" },
  { time: "07:55", action: "Cập nhật trạng thái SV.2023.00891", actor: "Admin", type: "update" },
  { time: "Hôm qua", action: "Phê duyệt chương trình mới",  actor: "Admin", type: "approve" },
];

const TYPE_COLOR = { create: "#10b981", update: "#2563eb", approve: "#8b5cf6" };

export function AdminDashboard() {
  const { user } = useRole();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)" }}
      >
        <div>
          <p style={{ color: "#a7f3d0", fontSize: "0.82rem" }}>Bảng điều khiển Quản trị 🎓</p>
          <h1 style={{ color: "white", marginTop: 2 }}>{user?.name}</h1>
          <p style={{ color: "#bbf7d0", fontSize: "0.8rem", marginTop: 4 }}>
            {user?.id} · {user?.department} · HK2 — 2025/2026
          </p>
        </div>
        {/*
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Lớp học phần",  path: "/admin/courses",    icon: BookMarked },
            { label: "Trạng thái SV", path: "/admin/student-status",     icon: AlertTriangle },
            { label: "Quản lý TKB",   path: "/admin/timetable-manager",  icon: CalendarRange },
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
        */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng Sinh viên",  value: "6.318",  sub: "+124 học kỳ này",  color: "#2563eb", bg: "#dbeafe", icon: Users },
          { label: "Lớp học phần",    value: "247",    sub: "Đang mở học kỳ 2", color: "#8b5cf6", bg: "#ede9fe", icon: BookMarked },
          { label: "Chương trình",    value: "18",     sub: "8 khoa · 18 CTĐT", color: "#10b981", bg: "#d1fae5", icon: FolderOpen },
          { label: "Cần xử lý",       value: "31",     sub: "SV cảnh báo học vụ",color: "#f59e0b", bg: "#fef3c7", icon: AlertTriangle },
        ].map(({ label, value, sub, color, bg, icon: Icon }) => (
          <div key={label} className="rounded-2xl p-4" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <div className="flex items-center justify-between mb-3">
              <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{label}</p>
              <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} color={color} />
              </div>
            </div>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>{value}</p>
            <p style={{ fontSize: "0.72rem", color, fontWeight: 600, marginTop: 2 }}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Enrollment chart */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} color="#10b981" />
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Biến động sinh viên</p>
              <p style={{ fontSize: "0.72rem", color: "#64748b" }}>Nhập học mới & Nghỉ học (9 tháng gần nhất)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ENROLL_DATA} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: "0.78rem" }} />
              <Bar dataKey="new"   fill="#10b981" radius={[4,4,0,0]} name="Nhập học" />
              <Bar dataKey="leave" fill="#ef4444" radius={[4,4,0,0]} name="Nghỉ học" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dept pie */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", marginBottom: 2 }}>Phân bổ theo Khoa</p>
          <p style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 12 }}>Tổng 6.318 sinh viên</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={DEPT_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                {DEPT_DATA.map((_, i) => (
                  <Cell key={i} fill={DEPT_COLORS[i]} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "0.72rem" }} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: "0.78rem" }} formatter={(v) => [`${v} SV`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick nav + Recent logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", marginBottom: 14 }}>Chức năng quản trị</p>
          <div className="space-y-2">
            {[
              { label: "Quản lý Lớp học phần",    path: "/admin/courses",   icon: BookMarked, color: "#8b5cf6", bg: "#ede9fe", desc: "Mở/đóng lớp, phân công GV" },
              { label: "Quản lý Chương trình ĐT", path: "/admin/curriculum",icon: FolderOpen, color: "#10b981", bg: "#d1fae5", desc: "Cập nhật CTĐT, môn học" },
              { label: "Trạng thái Sinh viên",    path: "/admin/student-status",    icon: AlertTriangle, color: "#f59e0b", bg: "#fef3c7", desc: "Cảnh báo, đình chỉ, buộc thôi" },
              { label: "Quản lý Thời khóa biểu",  path: "/admin/timetable-manager", icon: CalendarRange, color: "#2563eb", bg: "#dbeafe", desc: "Lập và điều chỉnh TKB" },
            ].map(({ label, path, icon: Icon, color, bg, desc }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left"
                style={{ border: "1px solid #f1f5f9", cursor: "pointer", background: "none" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={color} />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e293b" }}>{label}</p>
                  <p style={{ fontSize: "0.7rem", color: "#64748b" }}>{desc}</p>
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent actions */}
        <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Hoạt động gần đây</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
            {RECENT_LOGS.map((log, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <div style={{ width: 8, height: 8, borderRadius: 9999, backgroundColor: TYPE_COLOR[log.type], flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.82rem", color: "#1e293b" }} className="truncate">{log.action}</p>
                  <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{log.actor} · {log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3" style={{ borderTop: "1px solid #f1f5f9" }}>
            <button
              onClick={() => navigate("/admin/logs")}
              style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
            >
              Xem nhật ký đầy đủ →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
