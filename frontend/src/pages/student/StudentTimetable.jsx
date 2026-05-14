import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const DAYS   = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const DATES  = ["12/05", "13/05", "14/05", "15/05", "16/05", "17/05"];
const SLOTS  = [
  { id: 1, label: "Tiết 1-3",  time: "07:30 – 09:45" },
  { id: 2, label: "Tiết 4-6",  time: "10:00 – 12:15" },
  { id: 3, label: "Tiết 7-9",  time: "13:00 – 15:15" },
  { id: 4, label: "Tiết 10-12",time: "15:30 – 17:45" },
];

const SCHEDULE = [
  { day: 0, slot: 1, code: "CSC401", name: "Hệ điều hành",        room: "B201",  type: "lecture", color: "#dbeafe", border: "#2563eb" },
  { day: 0, slot: 3, code: "CSC380", name: "Kiểm thử Phần mềm",   room: "Lab C2",type: "lab",     color: "#ede9fe", border: "#8b5cf6" },
  { day: 1, slot: 2, code: "MTH302", name: "Xác suất Thống kê",   room: "A105",  type: "lecture", color: "#dbeafe", border: "#2563eb" },
  { day: 2, slot: 3, code: "CSC312", name: "Mạng máy tính",        room: "C301",  type: "lecture", color: "#dbeafe", border: "#2563eb" },
  { day: 3, slot: 1, code: "ENG201", name: "Tiếng Anh Chuyên ngành",room:"D102", type: "lecture", color: "#d1fae5", border: "#10b981" },
  { day: 4, slot: 2, code: "CSC420", name: "Trí tuệ Nhân tạo",     room: "B305", type: "lecture", color: "#dbeafe", border: "#2563eb" },
  { day: 4, slot: 3, code: "CSC380", name: "Kiểm thử Phần mềm (TH)", room: "Lab C1", type: "lab", color: "#ede9fe", border: "#8b5cf6" },
];

export function StudentTimetable() {
  const [week, setWeek] = useState(18);

  function getCell(day, slot) {
    return SCHEDULE.find((s) => s.day === day && s.slot === slot);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ color: "#1e293b" }}>Thời khóa biểu</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
            Học kỳ 2 — 2025/2026 · Tuần {week}/28
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeek((w) => Math.max(1, w - 1))} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>
            <ChevronLeft size={16} color="#475569" />
          </button>
          <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1e293b", padding: "0 8px" }}>
            Tuần {week}: {DATES[0]} – {DATES[5]}/2026
          </span>
          <button onClick={() => setWeek((w) => Math.min(28, w + 1))} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>
            <ChevronRight size={16} color="#475569" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap">
        {[
          { label: "Lý thuyết", color: "#2563eb", bg: "#dbeafe" },
          { label: "Thực hành", color: "#8b5cf6", bg: "#ede9fe" },
          { label: "Ngoại ngữ", color: "#10b981", bg: "#d1fae5" },
        ].map(({ label, color, bg }) => (
          <div key={label} className="flex items-center gap-2">
            <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: bg, border: `2px solid ${color}` }} />
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Timetable grid */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 700 }}>
            <thead>
              <tr style={{ backgroundColor: "#1a3461" }}>
                <th style={{ width: 110, padding: "12px 16px", textAlign: "left", fontSize: "0.72rem", color: "#93c5fd", fontWeight: 700 }}>
                  Ca học
                </th>
                {DAYS.map((d, i) => (
                  <th key={d} style={{ padding: "12px 8px", textAlign: "center", fontSize: "0.78rem", color: "white", fontWeight: 700 }}>
                    <p>{d}</p>
                    <p style={{ fontSize: "0.68rem", color: "#93c5fd", fontWeight: 400 }}>{DATES[i]}</p>
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
                      <td key={di} style={{ padding: 6, verticalAlign: "top", minWidth: 100 }}>
                        {cell ? (
                          <div style={{
                            backgroundColor: cell.color,
                            border: `1.5px solid ${cell.border}`,
                            borderRadius: 10, padding: "8px 10px",
                          }}>
                            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: cell.border, fontFamily: "monospace" }}>
                              {cell.code}
                            </p>
                            <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#1e293b", marginTop: 2, lineHeight: 1.3 }}>
                              {cell.name}
                            </p>
                            <div className="flex items-center gap-1 mt-1.5">
                              <Calendar size={10} color="#94a3b8" />
                              <p style={{ fontSize: "0.65rem", color: "#64748b" }}>{cell.room}</p>
                            </div>
                          </div>
                        ) : (
                          <div style={{ height: 60 }} />
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

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Môn học",       value: "6 môn", color: "#2563eb" },
          { label: "Tiết/tuần",     value: "18 tiết", color: "#8b5cf6" },
          { label: "Tín chỉ HK",    value: "17 TC",   color: "#10b981" },
          { label: "Phòng Lab",     value: "2 buổi",  color: "#f59e0b" },
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


export default StudentTimetable;