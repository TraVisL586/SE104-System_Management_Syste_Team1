import { useState } from "react";
import { CheckSquare, Save, AlertTriangle } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const CLASSES = [
  { code: "CSC401-L01", name: "Hệ điều hành (L01)" },
  { code: "CSC401-L02", name: "Hệ điều hành (L02)" },
  { code: "CSC420-L01", name: "Trí tuệ Nhân tạo (L01)" },
];

const SESSIONS = [
  { id: 1, date: "12/05/2026", label: "Buổi 18 – Quản lý bộ nhớ" },
  { id: 2, date: "05/05/2026", label: "Buổi 17 – Lập lịch CPU" },
  { id: 3, date: "28/04/2026", label: "Buổi 16 – Tiến trình & Luồng" },
];

const STUDENTS = [
  { id: "SV.2023.00001", name: "Nguyễn Thị Lan" },
  { id: "SV.2023.00002", name: "Trần Văn Bình" },
  { id: "SV.2023.00003", name: "Lê Minh Châu" },
  { id: "SV.2023.00004", name: "Phạm Thu Dung" },
  { id: "SV.2023.00005", name: "Hoàng Văn Em" },
  { id: "SV.2023.00006", name: "Vũ Thị Phượng" },
  { id: "SV.2023.00007", name: "Đỗ Quang Giang" },
  { id: "SV.2023.00008", name: "Bùi Thị Hoa" },
  { id: "SV.2023.00009", name: "Ngô Văn Inh" },
  { id: "SV.2023.00010", name: "Đinh Thị Kim" },
];

const STATUS_OPTS = [
  { key: "present", label: "Có mặt",  color: "#10b981", bg: "#d1fae5" },
  { key: "late",    label: "Đi trễ",  color: "#f59e0b", bg: "#fef3c7" },
  { key: "absent",  label: "Vắng",    color: "#ef4444", bg: "#fee2e2" },
];

export function Attendance() {
  const [cls,     setCls]     = useState("CSC401-L01");
  const [session, setSession] = useState(1);
  const [records, setRecords] = useState(
    Object.fromEntries(STUDENTS.map((s) => [s.id, "present"]))
  );
  const { showToast } = useToast();

  const stats = {
    present: Object.values(records).filter((v) => v === "present").length,
    late:    Object.values(records).filter((v) => v === "late").length,
    absent:  Object.values(records).filter((v) => v === "absent").length,
  };

  function markAll(status) {
    setRecords(Object.fromEntries(STUDENTS.map((s) => [s.id, status])));
  }

  function save() {
    showToast("success", "Lưu điểm danh thành công!", `${CLASSES.find((c)=>c.code===cls)?.name} · Buổi ${session} · ${stats.present} có mặt`);
  }

  const sess = SESSIONS.find((s) => s.id === session);

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Điểm danh</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Ghi nhận điểm danh sinh viên theo từng buổi học
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap gap-4">
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Lớp học phần</p>
          <div className="flex gap-2 flex-wrap">
            {CLASSES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCls(c.code)}
                style={{
                  padding: "7px 14px", borderRadius: 10, fontSize: "0.8rem",
                  backgroundColor: cls === c.code ? "#4c1d95" : "#fff",
                  color: cls === c.code ? "#fff" : "#334155",
                  border: `1px solid ${cls === c.code ? "#4c1d95" : "#e2e8f0"}`,
                  cursor: "pointer",
                }}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Buổi học</p>
          <div className="flex gap-2 flex-wrap">
            {SESSIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSession(s.id)}
                style={{
                  padding: "7px 14px", borderRadius: 10, fontSize: "0.8rem",
                  backgroundColor: session === s.id ? "#1a3461" : "#fff",
                  color: session === s.id ? "#fff" : "#334155",
                  border: `1px solid ${session === s.id ? "#1a3461" : "#e2e8f0"}`,
                  cursor: "pointer",
                }}
              >
                {s.date}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Session info */}
      <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
        <CheckSquare size={16} color="#2563eb" />
        <p style={{ fontSize: "0.82rem", color: "#1e40af" }}>
          <strong>{sess?.label}</strong> · {sess?.date} · {CLASSES.find((c) => c.code === cls)?.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {STATUS_OPTS.map(({ key, label, color, bg }) => (
          <div key={key} className="rounded-xl p-3 text-center" style={{ backgroundColor: bg }}>
            <p style={{ fontSize: "1.4rem", fontWeight: 800, color }}>{stats[key]}</p>
            <p style={{ fontSize: "0.72rem", color, fontWeight: 600 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-2">
        <p style={{ fontSize: "0.8rem", color: "#64748b", alignSelf: "center" }}>Đánh dấu tất cả:</p>
        {STATUS_OPTS.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => markAll(key)}
            style={{
              padding: "5px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600,
              color, border: `1px solid ${color}40`, backgroundColor: `${color}15`, cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Attendance table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              {["#", "MSSV", "Họ và tên", "Trạng thái", "Ghi chú"].map((h) => (
                <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s, i) => {
              const status = records[s.id] ?? "present";
              const opt    = STATUS_OPTS.find((o) => o.key === status);
              return (
                <tr key={s.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                  <td className="px-4 py-3" style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{i + 1}</td>
                  <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600 }}>{s.id}</td>
                  <td className="px-4 py-3" style={{ fontSize: "0.85rem", color: "#1e293b" }}>{s.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {STATUS_OPTS.map((o) => (
                        <button
                          key={o.key}
                          onClick={() => setRecords((p) => ({ ...p, [s.id]: o.key }))}
                          style={{
                            padding: "3px 10px", borderRadius: 8, fontSize: "0.72rem", fontWeight: 600,
                            backgroundColor: status === o.key ? o.bg : "#f8fafc",
                            color: status === o.key ? o.color : "#94a3b8",
                            border: `1px solid ${status === o.key ? o.color : "#e2e8f0"}`,
                            cursor: "pointer",
                          }}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {status === "absent" && (
                      <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                        <AlertTriangle size={11} /> Vắng không phép
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
          style={{ backgroundColor: "#4c1d95", color: "white", border: "none", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600 }}
        >
          <Save size={15} /> Lưu điểm danh
        </button>
      </div>
    </div>
  );
}

export default Attendance;