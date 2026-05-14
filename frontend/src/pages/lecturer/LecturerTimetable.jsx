import { useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const DAYS  = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];
const DATES = ["12/05", "13/05", "14/05", "15/05", "16/05"];
const SLOTS = [
  { id: 1, label: "Tiết 1–3",  time: "07:30–09:45" },
  { id: 2, label: "Tiết 4–6",  time: "10:00–12:15" },
  { id: 3, label: "Tiết 7–9",  time: "13:00–15:15" },
  { id: 4, label: "Tiết 10–12",time: "15:30–17:45" },
];

const SCHEDULE = [
  { day: 0, slot: 1, code: "CSC401-L01", name: "Hệ điều hành (L01)",       room: "B201", sv: 42, color: "#ede9fe", border: "#8b5cf6" },
  { day: 1, slot: 2, code: "CSC401-L01", name: "Bù tiết – HĐH L01",        room: "B201", sv: 42, color: "#ede9fe", border: "#8b5cf6" },
  { day: 2, slot: 2, code: "CSC401-L02", name: "Hệ điều hành (L02)",       room: "B202", sv: 38, color: "#dbeafe", border: "#2563eb" },
  { day: 3, slot: 3, code: "CSC490-G02", name: "ĐA Tốt nghiệp II (HD)",    room: "GV304",sv: 12, color: "#d1fae5", border: "#10b981" },
  { day: 4, slot: 2, code: "CSC420-L01", name: "Trí tuệ Nhân tạo (L01)",  room: "B305", sv: 45, color: "#fef3c7", border: "#f59e0b" },
];

export function LecturerTimetable() {
  const [week, setWeek] = useState(18);

  function getCell(day, slot) {
    return SCHEDULE.find((s) => s.day === day && s.slot === slot);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ color: "#1e293b" }}>Lịch giảng dạy</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
            Học kỳ 2 — 2025/2026 · Tuần {week}/28
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeek((w) => Math.max(1, w - 1))} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>
            <ChevronLeft size={16} color="#475569" />
          </button>
          <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1e293b", padding: "0 8px" }}>
            Tuần {week}: {DATES[0]}–{DATES[4]}/2026
          </span>
          <button onClick={() => setWeek((w) => Math.min(28, w + 1))} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>
            <ChevronRight size={16} color="#475569" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 620 }}>
            <thead>
              <tr style={{ backgroundColor: "#4c1d95" }}>
                <th style={{ width: 110, padding: "12px 16px", textAlign: "left", fontSize: "0.72rem", color: "#c4b5fd", fontWeight: 700 }}>
                  Ca học
                </th>
                {DAYS.map((d, i) => (
                  <th key={d} style={{ padding: "12px 8px", textAlign: "center", fontSize: "0.78rem", color: "white", fontWeight: 700 }}>
                    <p>{d}</p>
                    <p style={{ fontSize: "0.68rem", color: "#c4b5fd", fontWeight: 400 }}>{DATES[i]}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot) => (
                <tr key={slot.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 16px", backgroundColor: "#f8fafc" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e293b" }}>{slot.label}</p>
                    <p style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{slot.time}</p>
                  </td>
                  {DAYS.map((_, di) => {
                    const cell = getCell(di, slot.id);
                    return (
                      <td key={di} style={{ padding: 6, verticalAlign: "top", minWidth: 120 }}>
                        {cell ? (
                          <div style={{ backgroundColor: cell.color, border: `1.5px solid ${cell.border}`, borderRadius: 10, padding: "8px 10px" }}>
                            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: cell.border, fontFamily: "monospace" }}>{cell.code}</p>
                            <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#1e293b", marginTop: 2, lineHeight: 1.3 }}>{cell.name}</p>
                            <div className="flex items-center gap-1 mt-1.5">
                              <Users size={10} color="#94a3b8" />
                              <p style={{ fontSize: "0.65rem", color: "#64748b" }}>{cell.sv} SV · {cell.room}</p>
                            </div>
                          </div>
                        ) : (
                          <div style={{ height: 64 }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Lớp học",      value: "4 lớp",   color: "#8b5cf6" },
          { label: "Tổng SV",     value: "137 SV",  color: "#2563eb" },
          { label: "Tiết/tuần",   value: "12 tiết", color: "#10b981" },
          { label: "Ngày dạy",    value: "4 ngày",  color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl px-4 py-3 text-center" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color }}>{value}</p>
            <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LecturerTimetable;