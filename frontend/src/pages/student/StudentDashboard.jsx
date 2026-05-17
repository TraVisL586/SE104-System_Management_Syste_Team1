import { useNavigate } from "react-router";
import { useRole } from "../../context/RoleContext";
import { useToast } from "../../context/ToastContext";
import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  BookOpen, Calendar, Award, CreditCard, FileText, AlertTriangle,
  TrendingUp, Clock, ChevronRight, Loader2,
} from "lucide-react";
import studentService from "../../services/studentService";
import ChangePasswordModal from "../../components/ChangePasswordModal";

const GPA_TREND = [
  { ky: "HK1/23", gpa: 7.2 },
  { ky: "HK2/23", gpa: 7.5 },
  { ky: "HK1/24", gpa: 7.8 },
  { ky: "HK2/24", gpa: 8.1 },
  { ky: "HK1/25", gpa: 7.9 },
  { ky: "HK2/25", gpa: 8.3 },
];

const ENROLLED_COURSES = [
  { code: "CSC401", name: "Hệ điều hành",         tc: 3, gv: "GS. Nguyễn Văn An", lich: "T2 7:30",  room: "B201" },
  { code: "MTH302", name: "Xác suất Thống kê",     tc: 3, gv: "TS. Lê Thị Bình",   lich: "T3 9:30",  room: "A105" },
  { code: "CSC312", name: "Mạng máy tính",          tc: 3, gv: "PGS. Phạm Văn Cường",lich: "T4 13:30", room: "C301" },
  { code: "ENG201", name: "Tiếng Anh Chuyên ngành", tc: 2, gv: "ThS. Nguyễn Thị Dung",lich: "T5 7:30", room: "D102" },
  { code: "CSC420", name: "Trí tuệ nhân tạo",       tc: 3, gv: "GS. Trần Minh Tú",   lich: "T6 9:30",  room: "B305" },
  { code: "CSC380", name: "Kiểm thử phần mềm",      tc: 3, gv: "TS. Hoàng Văn Đức",  lich: "T2 13:30", room: "Lab C2" },
];

const RECENT_GRADES = [
  { mon: "Lập trình Web", giuaky: 8.5, cuoiky: null,  tc: 3 },
  { mon: "CSDL Nâng cao",  giuaky: 7.8, cuoiky: 8.2,  tc: 3 },
  { mon: "Kiến trúc PM",   giuaky: 9.0, cuoiky: null,  tc: 3 },
];

const UPCOMING = [
  { time: "T2 07:30", mon: "Hệ điều hành",      room: "B201", type: "lecture" },
  { time: "T2 13:30", mon: "Kiểm thử PM",        room: "Lab C2", type: "lab" },
  { time: "T3 09:30", mon: "Xác suất Thống kê",  room: "A105", type: "lecture" },
];

const STAT_CARDS = [
  { label: "GPA Tích lũy",     value: "8.30",   sub: "Xếp loại: Giỏi",        icon: TrendingUp,  color: "#2563eb", bg: "#dbeafe" },
  { label: "Tín chỉ HK này",   value: "17/24",  sub: "BR-2: Tối đa 24 TC",    icon: BookOpen,    color: "#8b5cf6", bg: "#ede9fe" },
  { label: "Tín chỉ Tích lũy", value: "86/130", sub: "66% chương trình",      icon: Award,       color: "#10b981", bg: "#d1fae5" },
  { label: "Học phí còn lại",  value: "4.2 tr", sub: "⚠ Hạn: 30/05/2026",    icon: CreditCard,  color: "#f59e0b", bg: "#fef3c7" },
];

export function StudentDashboard() {
  const { user } = useRole();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await studentService.getMyProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
        showToast('error', 'Error', err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  const ENROLLED_COURSES = [
  { code: "CSC401", name: "Hệ điều hành",         tc: 3, gv: "GS. Nguyễn Văn An", lich: "T2 7:30",  room: "B201" },
  { code: "MTH302", name: "Xác suất Thống kê",     tc: 3, gv: "TS. Lê Thị Bình",   lich: "T3 9:30",  room: "A105" },
  { code: "CSC312", name: "Mạng máy tính",          tc: 3, gv: "PGS. Phạm Văn Cường",lich: "T4 13:30", room: "C301" },
  { code: "ENG201", name: "Tiếng Anh Chuyên ngành", tc: 2, gv: "ThS. Nguyễn Thị Dung",lich: "T5 7:30", room: "D102" },
  { code: "CSC420", name: "Trí tuệ nhân tạo",       tc: 3, gv: "GS. Trần Minh Tú",   lich: "T6 9:30",  room: "B305" },
  { code: "CSC380", name: "Kiểm thử phần mềm",      tc: 3, gv: "TS. Hoàng Văn Đức",  lich: "T2 13:30", room: "Lab C2" },
];

const RECENT_GRADES = [
  { mon: "Lập trình Web", giuaky: 8.5, cuoiky: null,  tc: 3 },
  { mon: "CSDL Nâng cao",  giuaky: 7.8, cuoiky: 8.2,  tc: 3 },
  { mon: "Kiến trúc PM",   giuaky: 9.0, cuoiky: null,  tc: 3 },
];

const UPCOMING = [
  { time: "T2 07:30", mon: "Hệ điều hành",      room: "B201", type: "lecture" },
  { time: "T2 13:30", mon: "Kiểm thử PM",        room: "Lab C2", type: "lab" },
  { time: "T3 09:30", mon: "Xác suất Thống kê",  room: "A105", type: "lecture" },
];

const STAT_CARDS = [
  { label: "GPA Tích lũy",     value: "8.30",   sub: "Xếp loại: Giỏi",        icon: TrendingUp,  color: "#2563eb", bg: "#dbeafe" },
  { label: "Tín chỉ HK này",   value: "17/24",  sub: "BR-2: Tối đa 24 TC",    icon: BookOpen,    color: "#8b5cf6", bg: "#ede9fe" },
  { label: "Tín chỉ Tích lũy", value: "86/130", sub: "66% chương trình",      icon: Award,       color: "#10b981", bg: "#d1fae5" },
  { label: "Học phí còn lại",  value: "4.2 tr", sub: "⚠ Hạn: 30/05/2026",    icon: CreditCard,  color: "#f59e0b", bg: "#fef3c7" },
];

  const displayName = profile?.name || user?.name || "Sinh viên";
  const studentCode = profile?.studentCode || user?.id || "N/A";
  const department = profile?.department || user?.department || "N/A";
  const totalTC = ENROLLED_COURSES.reduce((s, c) => s + c.tc, 0);

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #1a3461 0%, #2563eb 100%)" }}
      >
        <div>
          <p style={{ color: "#93c5fd", fontSize: "0.82rem" }}>Chào mừng trở lại 👋</p>
          <h1 style={{ color: "white", marginTop: 2 }}>{displayName}</h1>
          <p style={{ color: "#bfdbfe", fontSize: "0.8rem", marginTop: 4 }}>
            {studentCode} · {department} · Học kỳ 2 — Năm học 2025/2026
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Đăng ký môn",  path: "/student/registrations", icon: BookOpen },
            { label: "Xem điểm",     path: "/student/grades",        icon: Award },
            { label: "Đóng học phí", path: "/student/fees",          icon: CreditCard },
          ].map(({ label, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 500 }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
          <ChangePasswordModal />
        </div>
      </div>

      {/* Warning */}
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{ backgroundColor: "#fef3c7", border: "1px solid #fde68a" }}
      >
        <AlertTriangle size={16} color="#f59e0b" />
        <p style={{ fontSize: "0.82rem", color: "#92400e" }}>
          <strong>Cảnh báo học phí (BR-6):</strong> Còn 4.200.000₫ chưa thanh toán. Hạn nộp:{" "}
          <strong>30/05/2026</strong>. Vui lòng thanh toán để tránh bị khóa đăng ký.
        </p>
        <button
          onClick={() => navigate("/student/fees")}
          style={{ marginLeft: "auto", backgroundColor: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "4px 12px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Thanh toán ngay
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
          >
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
        {/* GPA Trend chart */}
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Xu hướng GPA</p>
              <p style={{ fontSize: "0.72rem", color: "#64748b" }}>6 học kỳ gần nhất · Thang 10.0 (BR-8)</p>
            </div>
            <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#2563eb" }}>8.30</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={GPA_TREND}>
              <defs>
                <linearGradient id="stdGpaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="ky" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis domain={[6, 10]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: "0.8rem" }}
                formatter={(v) => [`${v}`, "GPA"]}
              />
              <Area type="monotone" dataKey="gpa" stroke="#2563eb" strokeWidth={2.5} fill="url(#stdGpaGrad)" dot={{ r: 4, fill: "#2563eb" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming schedule */}
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Lịch sắp tới</p>
            <button
              onClick={() => navigate("/student/timetable")}
              style={{ fontSize: "0.72rem", color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}
            >
              Xem TKB
            </button>
          </div>
          <div className="space-y-3">
            {UPCOMING.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: item.type === "lab" ? "#ede9fe" : "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={15} color={item.type === "lab" ? "#8b5cf6" : "#2563eb"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1e293b" }} className="truncate">{item.mon}</p>
                  <p style={{ fontSize: "0.7rem", color: "#64748b" }}>{item.time} · {item.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Enrolled courses */}
        <div
          className="rounded-2xl"
          style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Môn đang học</p>
              <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{totalTC}/24 tín chỉ đã đăng ký</p>
            </div>
            <button
              onClick={() => navigate("/student/registrations")}
              className="flex items-center gap-1"
              style={{ fontSize: "0.72rem", color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}
            >
              Quản lý <ChevronRight size={13} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  {["Mã MH", "Tên môn học", "TC", "Lịch"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ENROLLED_COURSES.map((c) => (
                  <tr key={c.code} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td className="px-4 py-2.5" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#2563eb", fontWeight: 600 }}>{c.code}</td>
                    <td className="px-4 py-2.5" style={{ fontSize: "0.8rem", color: "#1e293b" }}>{c.name}</td>
                    <td className="px-4 py-2.5" style={{ fontSize: "0.78rem", color: "#64748b" }}>{c.tc}</td>
                    <td className="px-4 py-2.5" style={{ fontSize: "0.72rem", color: "#64748b" }}>{c.lich} · {c.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent grades + quick requests */}
        <div className="space-y-5">
          <div
            className="rounded-2xl"
            style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Điểm gần nhất</p>
              <button
                onClick={() => navigate("/student/grades")}
                style={{ fontSize: "0.72rem", color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}
              >
                Xem bảng điểm
              </button>
            </div>
            <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              {RECENT_GRADES.map((g) => (
                <div key={g.mon} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p style={{ fontSize: "0.82rem", color: "#1e293b", fontWeight: 500 }}>{g.mon}</p>
                    <p style={{ fontSize: "0.7rem", color: "#64748b" }}>{g.tc} tín chỉ</p>
                  </div>
                  <div className="flex gap-3 text-right">
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Giữa kỳ</p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#2563eb" }}>{g.giuaky}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Cuối kỳ</p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: g.cuoiky ? "#10b981" : "#94a3b8" }}>
                        {g.cuoiky ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
          >
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", marginBottom: 12 }}>Thao tác nhanh</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Nộp đơn học vụ",   path: "/student/requests",      icon: FileText,  color: "#2563eb", bg: "#dbeafe" },
                { label: "Xem thời khóa biểu",path: "/student/timetable",     icon: Calendar,  color: "#8b5cf6", bg: "#ede9fe" },
                { label: "Tra cứu điểm",      path: "/student/grades",        icon: Award,     color: "#10b981", bg: "#d1fae5" },
                { label: "Thanh toán học phí",path: "/student/fees",          icon: CreditCard,color: "#f59e0b", bg: "#fef3c7" },
              ].map(({ label, path, icon: Icon, color, bg }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="flex items-center gap-2 p-3 rounded-xl text-left"
                  style={{ backgroundColor: bg, border: "none", cursor: "pointer" }}
                >
                  <Icon size={16} color={color} />
                  <span style={{ fontSize: "0.78rem", color, fontWeight: 600 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;