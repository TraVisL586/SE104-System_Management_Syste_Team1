import { useState } from "react";
import { Search, UserCheck, Award, CreditCard, FileText, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STUDENTS = [
  { id: "SV.2023.00847", name: "Nguyễn Thị Lan",  khoa: "CNTT", lop: "CNTT2023-01", gpa: 8.3,  tc: 86,  status: "active",   year: 3, fees: "paid",   requests: 3, gpaHistory: [{ky:"HK1/23",gpa:7.2},{ky:"HK2/23",gpa:7.5},{ky:"HK1/24",gpa:7.8},{ky:"HK2/24",gpa:8.1},{ky:"HK1/25",gpa:7.9},{ky:"HK2/25",gpa:8.3}] },
  { id: "SV.2022.01234", name: "Trần Văn Hùng",   khoa: "CNTT", lop: "CNTT2022-02", gpa: 4.1,  tc: 62,  status: "warning2", year: 4, fees: "pending", requests: 2, gpaHistory: [{ky:"HK1/22",gpa:5.2},{ky:"HK2/22",gpa:4.8},{ky:"HK1/23",gpa:4.5},{ky:"HK2/23",gpa:4.0},{ky:"HK1/24",gpa:3.9},{ky:"HK2/24",gpa:4.1}] },
  { id: "SV.2021.00568", name: "Lê Thị Mai",       khoa: "Kinh tế",lop:"KT2021-01", gpa: 3.2,  tc: 45,  status: "suspended",year: 5, fees: "overdue", requests: 5, gpaHistory: [{ky:"HK1/21",gpa:5.0},{ky:"HK2/21",gpa:4.2},{ky:"HK1/22",gpa:3.8},{ky:"HK2/22",gpa:3.5},{ky:"HK1/23",gpa:3.0},{ky:"HK2/23",gpa:3.2}] },
  { id: "SV.2023.00991", name: "Phạm Quốc Bảo",   khoa: "Kỹ thuật",lop:"KT2023-03",gpa: 5.8,  tc: 75,  status: "warning1", year: 3, fees: "paid",   requests: 1, gpaHistory: [{ky:"HK1/23",gpa:6.5},{ky:"HK2/23",gpa:6.0},{ky:"HK1/24",gpa:5.5},{ky:"HK2/24",gpa:5.8},{ky:"HK1/25",gpa:5.7},{ky:"HK2/25",gpa:5.8}] },
];

const STATUS_CFG = {
  active:    { label: "Bình thường",    color: "#10b981", bg: "#d1fae5" },
  warning1:  { label: "Cảnh báo 1",     color: "#f59e0b", bg: "#fef3c7" },
  warning2:  { label: "Cảnh báo 2",     color: "#ef4444", bg: "#fee2e2" },
  suspended: { label: "Đình chỉ",       color: "#dc2626", bg: "#fee2e2" },
  expelled:  { label: "Buộc thôi học",  color: "#7f1d1d", bg: "#fee2e2" },
};

export function StudentProfiles() {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  const sv = STUDENTS.find((s) => s.id === selected);

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Hồ sơ Sinh viên</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Xem thông tin học vụ chi tiết của sinh viên được phụ trách — UC14
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Student list */}
        <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
              <input
                placeholder="Tìm sinh viên…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.82rem", outline: "none" }}
              />
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
            {filtered.map((s) => {
              const cfg = STATUS_CFG[s.status];
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  style={{
                    background: selected === s.id ? "#fffbeb" : "none",
                    border: selected === s.id ? "none" : "none",
                    borderLeft: selected === s.id ? `3px solid #f59e0b` : "3px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 9999, backgroundColor: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: cfg.color }}>
                      {s.name.charAt(s.name.lastIndexOf(" ") + 1)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1e293b" }} className="truncate">{s.name}</p>
                    <p style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>{s.id}</p>
                    <span style={{ fontSize: "0.62rem", fontWeight: 600, color: cfg.color }}>{cfg.label}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color: s.gpa < 5 ? "#ef4444" : s.gpa < 7 ? "#f59e0b" : "#10b981" }}>{s.gpa}</p>
                    <p style={{ fontSize: "0.62rem", color: "#94a3b8" }}>GPA</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile detail */}
        <div className="lg:col-span-2">
          {sv ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="rounded-2xl p-5 flex items-start justify-between flex-wrap gap-4" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: 56, height: 56, borderRadius: 9999, background: "linear-gradient(135deg,#92400e,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.2rem", fontWeight: 700 }}>
                    {sv.name.charAt(0)}
                  </div>
                  <div>
                    <h2 style={{ color: "#1e293b" }}>{sv.name}</h2>
                    <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#64748b" }}>{sv.id}</p>
                    <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{sv.khoa} · {sv.lop} · Năm {sv.year}</p>
                    <span style={{ display: "inline-block", marginTop: 4, fontSize: "0.7rem", fontWeight: 700, padding: "2px 9px", borderRadius: 9999, backgroundColor: STATUS_CFG[sv.status].bg, color: STATUS_CFG[sv.status].color }}>
                      {STATUS_CFG[sv.status].label}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "GPA", value: sv.gpa, color: sv.gpa < 5 ? "#ef4444" : sv.gpa < 7 ? "#f59e0b" : "#10b981" },
                    { label: "Tín chỉ", value: `${sv.tc}/130`, color: "#2563eb" },
                    { label: "Yêu cầu", value: sv.requests, color: "#8b5cf6" },
                  ].map(({ label, value, color }) => (
                    <div key={label}>
                      <p style={{ fontSize: "1.3rem", fontWeight: 800, color }}>{value}</p>
                      <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              {sv.status !== "active" && (
                <div className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#fef3c7", border: "1px solid #fde68a" }}>
                  <AlertTriangle size={16} color="#f59e0b" style={{ marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: "0.82rem", color: "#92400e" }}>
                    Sinh viên đang có tình trạng học vụ <strong>{STATUS_CFG[sv.status].label}</strong>. Cần tư vấn và theo dõi đặc biệt.
                    {sv.fees === "overdue" && " Ngoài ra sinh viên đang nợ học phí."}
                  </p>
                </div>
              )}

              {/* GPA Chart */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
                <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "#1e293b", marginBottom: 12 }}>Xu hướng GPA</p>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={sv.gpaHistory} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="ky" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ borderRadius: 10, fontSize: "0.78rem" }} formatter={(v) => [`${v}`, "GPA"]} />
                    <Bar dataKey="gpa" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Award,    label: "Học phí", value: sv.fees === "paid" ? "Đã đóng" : sv.fees === "pending" ? "Còn nợ" : "Quá hạn", color: sv.fees === "paid" ? "#10b981" : "#ef4444" },
                  { icon: FileText, label: "Đơn gửi", value: `${sv.requests} đơn`,  color: "#8b5cf6" },
                  { icon: UserCheck,label: "Khoa",    value: sv.khoa,               color: "#2563eb" },
                  { icon: AlertTriangle, label: "Năm học", value: `Năm ${sv.year}`, color: "#f59e0b" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="rounded-xl p-3" style={{ backgroundColor: "#f8fafc" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={13} color={color} />
                      <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{label}</p>
                    </div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
              <UserCheck size={40} color="#cbd5e1" style={{ margin: "0 auto 12px" }} />
              <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Chọn sinh viên để xem hồ sơ chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfiles;