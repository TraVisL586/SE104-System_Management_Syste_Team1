import { useState, useEffect, useCallback } from "react";
import { CalendarRange, Plus, Edit2, Trash2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import adminSchedulingService from "../../services/adminSchedulingService";

const DAYS  = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const SLOTS = [
  { id: 1, label: "Tiết 1–3",  time: "07:30–09:45" },
  { id: 2, label: "Tiết 4–6",  time: "10:00–12:15" },
  { id: 3, label: "Tiết 7–9",  time: "13:00–15:15" },
  { id: 4, label: "Tiết 10–12",time: "15:30–17:45" },
];

// Color palette for schedules
const COLORS = ["#dbeafe","#ede9fe","#d1fae5","#fef3c7"];
const BORDERS = ["#2563eb","#8b5cf6","#10b981","#f59e0b"];

// Calculate current week from today's date
const getCurrentWeek = () => {
  const semesterStart = new Date(2025, 8, 1); // Sept 1, 2025 (Week 1)
  const today = new Date();
  const daysElapsed = Math.floor((today - semesterStart) / (1000 * 60 * 60 * 24));
  const week = Math.floor(daysElapsed / 7) + 1;
  return Math.max(1, Math.min(week, 28)); // Clamp between 1-28
};

export function TimetableManager() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ day: 0, slot: 1, code: "", name: "", room: "", gv: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sectionId, setSectionId] = useState(null); // Section ID to manage schedules
  const [week, setWeek] = useState(getCurrentWeek()); // Current week
  const { showToast } = useToast();

  // Calculate dates dynamically based on week number
  const DATES = (() => {
    const semesterStart = new Date(2025, 8, 1); // Sept 1, 2025
    const daysOffset = (week - 1) * 7;
    const weekStart = new Date(semesterStart);
    weekStart.setDate(weekStart.getDate() + daysOffset);
    
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      dates.push(`${date.getDate()}/${date.getMonth() + 1}`);
    }
    return dates;
  })();

  // Load timetable data on mount
  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = useCallback(async () => {
    try {
      setLoading(true);
      const sections = await adminSchedulingService.getCourseSections();
      if (!Array.isArray(sections)) return setSchedule([]);
      
      const formattedSchedules = [];
      sections.forEach(sec => {
        if (sec.schedules && Array.isArray(sec.schedules)) {
          sec.schedules.forEach(sch => {
            let day = (sch.dayOfWeek || 1) - 1; 
            
            let slot = 1;
            const startTimeStr = String(sch.startTime || "07:30");
            if (startTimeStr.startsWith("07")) slot = 1;
            else if (startTimeStr.startsWith("10")) slot = 2;
            else if (startTimeStr.startsWith("13")) slot = 3;
            else if (startTimeStr.startsWith("15")) slot = 4;
            
            formattedSchedules.push({
              id: sch.id,
              sectionId: sec.id,
              day,
              slot,
              code: sec.code,
              name: sec.courseName,
              room: sch.roomCode || sch.roomName || "N/A",
              gv: sec.lecturerName || "N/A",
              color: COLORS[formattedSchedules.length % 4],
              border: BORDERS[formattedSchedules.length % 4]
            });
          });
        }
      });
      setSchedule(formattedSchedules);
    } catch (err) {
      setSchedule([]);
      const message = err?.data?.message || err?.message || "Không thể tải thời khóa biểu.";
      showToast("error", "Lỗi tải dữ liệu", message);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  function getCell(day, slot) {
    return schedule.find((s) => s.day === day && s.slot === slot);
  }

  function addEntry(e) {
    e.preventDefault();
    const conflict = getCell(parseInt(form.day), parseInt(form.slot));
    if (conflict) {
      showToast("error", "Xung đột thời khóa biểu!", `${DAYS[form.day]} ${SLOTS.find(s=>s.id===parseInt(form.slot))?.label} đã có lớp ${conflict.code}.`);
      return;
    }
    
    addScheduleToApi();
  }

  const addScheduleToApi = async () => {
    try {
      setSubmitting(true);
      
      if (!sectionId) {
        showToast("warning", "Chưa nhập Section ID", "Vui lòng nhập Section ID trước khi thêm lịch học.");
        setSubmitting(false);
        return;
      }
      if (!form.room) {
        showToast("warning", "Chưa nhập Room ID", "Vui lòng nhập Room ID (số) vào ô phòng học.");
        setSubmitting(false);
        return;
      }

      const slotTimes = {
        1: { start: "07:30:00", end: "09:45:00" },
        2: { start: "10:00:00", end: "12:15:00" },
        3: { start: "13:00:00", end: "15:15:00" },
        4: { start: "15:30:00", end: "17:45:00" },
      };

      const scheduleData = {
        roomId: parseInt(form.room),
        dayOfWeek: parseInt(form.day) + 1,
        startTime: slotTimes[form.slot].start,
        endTime: slotTimes[form.slot].end,
      };

      await adminSchedulingService.addCourseSectionSchedule(sectionId, scheduleData);
      
      showToast("success", "Đã thêm vào TKB!", `Section ${sectionId} · ${DAYS[form.day]}`);
      setForm({ day: 0, slot: 1, code: "", name: "", room: "", gv: "" });
      setShowForm(false);
      setSectionId(null);
      loadTimetable();
    } catch (err) {
      const message = err?.data?.message || err?.message || "Không thể thêm vào thời khóa biểu.";
      showToast("error", "Lỗi thêm dữ liệu", message);
    } finally {
      setSubmitting(false);
    }
  }

  function removeEntry(id) {
    const e = schedule.find((s) => s.id === id);
    removeScheduleFromApi(id, e);
  }

  const removeScheduleFromApi = async (id, entry) => {
    try {
      setSubmitting(true);
      const targetSectionId = entry?.sectionId || sectionId;
      
      if (targetSectionId) {
        await adminSchedulingService.removeCourseSectionSchedule(targetSectionId, id);
      }
      
      showToast("info", "Đã xóa khỏi TKB", entry?.code || "Thành công");
      loadTimetable();
    } catch (err) {
      const message = err?.data?.message || err?.message || "Không thể xóa khỏi thời khóa biểu.";
      showToast("error", "Lỗi xóa dữ liệu", message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ color: "#1e293b" }}>Quản lý Thời khóa biểu</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
            Học kỳ 2 — 2025/2026 · Tuần {week}/28
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeek((w) => Math.max(1, w - 1))} disabled={loading} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1 }}>
            <ChevronLeft size={16} color="#475569" />
          </button>
          <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1e293b", padding: "0 8px" }}>
            Tuần {week}: {DATES[0]} – {DATES[5]}/2026
          </span>
          <button onClick={() => setWeek((w) => Math.min(28, w + 1))} disabled={loading} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1 }}>
            <ChevronRight size={16} color="#475569" />
          </button>
          <button
            onClick={() => setShowForm((v) => !v)}
            disabled={submitting || loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{ backgroundColor: "#065f46", color: "white", border: "none", cursor: submitting || loading ? "not-allowed" : "pointer", fontSize: "0.85rem", fontWeight: 600, opacity: submitting || loading ? 0.6 : 1 }}
          >
            <Plus size={16} /> Thêm lịch học
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
          Đang tải thời khóa biểu...
        </div>
      )}

      {showForm && (
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
          <p style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b", marginBottom: 16 }}>Thêm lịch học mới</p>
          <form onSubmit={addEntry} className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 5 }}>Ngày trong tuần</label>
              <select
                value={form.day}
                onChange={(e) => setForm((p) => ({ ...p, day: e.target.value }))}
                style={{ width: "100%", padding: "8px 11px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
              >
                {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 5 }}>Ca học</label>
              <select
                value={form.slot}
                onChange={(e) => setForm((p) => ({ ...p, slot: e.target.value }))}
                style={{ width: "100%", padding: "8px 11px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
              >
                {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label} ({s.time})</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 5 }}>Section ID *</label>
              <input
                type="number"
                value={sectionId || ""}
                onChange={(e) => setSectionId(e.target.value ? parseInt(e.target.value) : null)}
                placeholder="VD: 1"
                required
                style={{ width: "100%", padding: "8px 11px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
              />
            </div>
            {[
              { key: "room", label: "Room ID (Phòng học)", placeholder: "VD: 1 (Lấy từ DB)" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 5 }}>{label}</label>
                <input
                  required
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: "100%", padding: "8px 11px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
                />
              </div>
            ))}
            <div className="col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "8px 18px", borderRadius: 10, border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.85rem" }}>Hủy</button>
              <button type="submit" style={{ padding: "8px 18px", borderRadius: 10, backgroundColor: "#065f46", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>Thêm vào TKB</button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 800 }}>
            <thead>
              <tr style={{ backgroundColor: "#065f46" }}>
                <th style={{ width: 110, padding: "12px 16px", textAlign: "left", fontSize: "0.72rem", color: "#a7f3d0", fontWeight: 700 }}>
                  Ca học
                </th>
                {DAYS.map((d) => (
                  <th key={d} style={{ padding: "12px 8px", textAlign: "center", fontSize: "0.78rem", color: "white", fontWeight: 700 }}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot) => (
                <tr key={slot.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 16px", backgroundColor: "#f8fafc" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e293b" }}>{slot.label}</p>
                    <p style={{ fontSize: "0.62rem", color: "#94a3b8" }}>{slot.time}</p>
                  </td>
                  {DAYS.map((_, di) => {
                    const cell = getCell(di, slot.id);
                    return (
                      <td key={di} style={{ padding: 5, verticalAlign: "top", minWidth: 110 }}>
                        {cell ? (
                          <div style={{ backgroundColor: cell.color, border: `1.5px solid ${cell.border}`, borderRadius: 9, padding: "7px 9px", position: "relative" }}>
                            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: cell.border, fontFamily: "monospace" }}>{cell.code}</p>
                            <p style={{ fontSize: "0.72rem", color: "#1e293b", lineHeight: 1.3, marginTop: 2 }}>{cell.name}</p>
                            <p style={{ fontSize: "0.62rem", color: "#64748b", marginTop: 2 }}>{cell.room} · {cell.gv}</p>
                            <div style={{ position: "absolute", top: 4, right: 4, display: "flex", gap: 2 }}>
                              <button onClick={() => removeEntry(cell.id)} style={{ width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, background: "rgba(255,255,255,0.8)", border: "none", cursor: "pointer" }}>
                                <Trash2 size={10} color="#ef4444" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ height: 70, border: "1.5px dashed #e2e8f0", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                            onClick={() => { setForm((p) => ({ ...p, day: di, slot: slot.id })); setShowForm(true); }}
                          >
                            <Plus size={14} color="#cbd5e1" />
                          </div>
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

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Lớp HP", value: `${new Set(schedule.map(s => s.code || s.courseCode)).size}`, color: "#065f46" },
          { label: "Buổi dạy", value: `${schedule.length}`, color: "#7c2d12" },
          { label: "Phòng", value: `${new Set(schedule.map(s => s.room)).size}`, color: "#1e40af" },
          { label: "Giảng viên", value: `${new Set(schedule.map(s => s.gv || s.lecturer)).size}`, color: "#7e22ce" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl px-4 py-3 text-center" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color }}>{value}</p>
            <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
        <AlertTriangle size={14} color="#2563eb" />
        <p style={{ fontSize: "0.78rem", color: "#1e40af" }}>
          Nhấn vào ô trống để thêm lịch học nhanh. Hệ thống sẽ tự kiểm tra xung đột phòng và giảng viên.
        </p>
      </div>
    </div>
  );
}

export default TimetableManager;