import { useNavigate } from "react-router";
import { useRole } from "../../context/RoleContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { UserCheck, FileText, AlertTriangle, Clock, ChevronRight } from "lucide-react";

const STATUS_DATA = [
  { name: "Bình thường", value: 89, color: "#10b981" },
  { name: "Cảnh báo",    value: 14, color: "#f59e0b" },
  { name: "Đình chỉ",    value: 3,  color: "#ef4444" },
];

const PENDING_REQUESTS = [
  { id: "YC-2026-031", name: "Trần Văn Hùng",   type: "Phúc khảo bài thi",      date: "18/04/2026", urgent: false },
  { id: "YC-2026-044", name: "Phạm Thu Dung",    type: "Xin nghỉ học tạm thời",  date: "30/04/2026", urgent: true  },
  { id: "YC-2026-051", name: "Lê Minh Châu",     type: "Xin bảo lưu kết quả",   date: "05/05/2026", urgent: false },
  { id: "YC-2026-058", name: "Hoàng Văn Nam",    type: "Miễn giảm học phí",      date: "08/05/2026", urgent: true  },
];

const AT_RISK = [
  { id: "SV.2022.01234", name: "Trần Văn Hùng",  gpa: 4.1, issue: "GPA < 4.5 — Cảnh báo 2 lần" },
  { id: "SV.2021.00568", name: "Lê Thị Mai",      gpa: 3.2, issue: "GPA < 4.0 — Đề xuất đình chỉ" },
  { id: "SV.2022.00876", name: "Bùi Thanh Tùng",  gpa: 4.8, issue: "GPA < 5.0 — Cảnh báo 1 lần" },
];

export function AdvisorDashboard() {
  const { user } = useRole();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #78350f 0%, #f59e0b 100%)" }}
      >
        <div>
          <p style={{ color: "#fde68a", fontSize: "0.82rem" }}>Bảng điều khiển Cố vấn Học tập 📋</p>
          <h1 style={{ color: "white", marginTop: 2 }}>{user?.name}</h1>
          <p style={{ color: "#fef3c7", fontSize: "0.8rem", marginTop: 4 }}>
            {user?.id} · {user?.department} · HK2 — 2025/2026
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Hồ sơ SV",   path: "/advisor/profiles",  icon: UserCheck },
            { label: "Xử lý đơn",  path: "/advisor/requests",  icon: FileText },
          ].map(({ label, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Sinh viên phụ trách",  value: 106,  sub: "3 lớp cố vấn",        color: "#f59e0b", bg: "#fef3c7", icon: UserCheck },
          { label: "Đơn chờ xử lý",        value: PENDING_REQUESTS.length, sub: `${PENDING_REQUESTS.filter(r=>r.urgent).length} đơn khẩn`, color: "#ef4444", bg: "#fee2e2", icon: FileText },
          { label: "Cảnh báo học vụ",      value: 14,   sub: "Cần theo dõi đặc biệt",color: "#f59e0b", bg: "#fef3c7", icon: AlertTriangle },
          { label: "Đã xử lý trong HK",    value: 47,   sub: "Rate duyệt: 85%",      color: "#10b981", bg: "#d1fae5", icon: Clock },
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
        {/* Status pie */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", marginBottom: 2 }}>Tình trạng học vụ</p>
          <p style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 12 }}>106 sinh viên phụ trách</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={STATUS_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {STATUS_DATA.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "0.72rem" }} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: "0.78rem" }} formatter={(v) => [`${v} SV`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pending requests */}
        <div className="lg:col-span-2 rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Đơn cần xử lý</p>
            <button
              onClick={() => navigate("/advisor/requests")}
              className="flex items-center gap-1"
              style={{ fontSize: "0.72rem", color: "#f59e0b", background: "none", border: "none", cursor: "pointer" }}
            >
              Xem tất cả <ChevronRight size={13} />
            </button>
          </div>
          {PENDING_REQUESTS.map((req) => (
            <div key={req.id} className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                backgroundColor: req.urgent ? "#fee2e2" : "#fef3c7",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {req.urgent ? <AlertTriangle size={17} color="#ef4444" /> : <FileText size={17} color="#f59e0b" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1e293b" }}>{req.type}</p>
                  {req.urgent && (
                    <span style={{ fontSize: "0.62rem", backgroundColor: "#fee2e2", color: "#ef4444", padding: "1px 6px", borderRadius: 9999, fontWeight: 700 }}>
                      KHẨN
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{req.name} · {req.id}</p>
              </div>
              <p style={{ fontSize: "0.68rem", color: "#94a3b8", whiteSpace: "nowrap" }}>{req.date}</p>
            </div>
          ))}
          <div className="px-5 py-3">
            <button
              onClick={() => navigate("/advisor/requests")}
              className="w-full py-2 rounded-xl"
              style={{ backgroundColor: "#fef3c7", color: "#92400e", border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}
            >
              Xử lý đơn yêu cầu →
            </button>
          </div>
        </div>
      </div>

      {/* At-risk students */}
      <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <AlertTriangle size={16} color="#ef4444" />
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Sinh viên cần theo dõi</p>
        </div>
        <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
          {AT_RISK.map((s) => (
            <div key={s.id} className="flex items-center gap-4 px-5 py-3">
              <div style={{ width: 36, height: 36, borderRadius: 9999, backgroundColor: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#ef4444" }}>{s.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1e293b" }}>{s.name}</p>
                <p style={{ fontSize: "0.7rem", color: "#64748b" }}>{s.id}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "1rem", fontWeight: 800, color: "#ef4444" }}>{s.gpa}</p>
                <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>GPA</p>
              </div>
              <div style={{ maxWidth: 200 }}>
                <p style={{ fontSize: "0.72rem", color: "#ef4444", fontWeight: 500 }}>{s.issue}</p>
              </div>
              <button
                onClick={() => navigate("/advisor/profiles")}
                style={{ padding: "5px 12px", borderRadius: 8, backgroundColor: "#fef3c7", color: "#92400e", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Xem hồ sơ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdvisorDashboard;