import { useState } from "react";
import { CalendarRange, Plus, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const DAYS  = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const SLOTS = [
  { id: 1, label: "Tiết 1–3",  time: "07:30–09:45" },
  { id: 2, label: "Tiết 4–6",  time: "10:00–12:15" },
  { id: 3, label: "Tiết 7–9",  time: "13:00–15:15" },
  { id: 4, label: "Tiết 10–12",time: "15:30–17:45" },
];

const INITIAL_SCHEDULE = [
  { id: "T001", day: 0, slot: 1, code: "CSC401-L01", name: "Hệ điều hành (L01)",     room: "B201", gv: "GS. Nguyễn Văn An", color: "#dbeafe", border: "#2563eb" },
  { id: "T002", day: 0, slot: 3, code: "CSC380-L01", name: "Kiểm thử PM (L01)",       room: "Lab C2",gv: "TS. Hoàng Văn Đức", color: "#ede9fe", border: "#8b5cf6" },
  { id: "T003", day: 1, slot: 2, code: "MTH302-L01", name: "XS Thống kê (L01)",       room: "A105", gv: "TS. Lê Thị Bình",   color: "#d1fae5", border: "#10b981" },
  { id: "T004", day: 2, slot: 2, code: "CSC401-L02", name: "Hệ điều hành (L02)",     room: "B202", gv: "GS. Nguyễn Văn An", color: "#dbeafe", border: "#2563eb" },
  { id: "T005", day: 3, slot: 3, code: "CSC420-L01", name: "Trí tuệ Nhân tạo (L01)",room: "B305", gv: "GS. Trần Minh Tú",  color: "#fef3c7", border: "#f59e0b" },
  { id: "T006", day: 4, slot: 2, code: "ENG201-L01", name: "Tiếng Anh CN (L01)",     room: "D102", gv: "ThS. N.T. Dung",     color: "#d1fae5", border: "#10b981" },
];

export function TimetableManager() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ day: 0, slot: 1, code: "", name: "", room: "", gv: "" });
  const { showToast } = useToast();

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
    const colors = ["#dbeafe","#ede9fe","#d1fae5","#fef3c7"];
    const borders = ["#2563eb","#8b5cf6","#10b981","#f59e0b"];
    const idx = schedule.length % 4;
    setSchedule((prev) => [...prev, {
      id: `T${Date.now()}`,
      day: parseInt(form.day),
      slot: parseInt(form.slot),
      ...form,
      color: colors[idx],
      border: borders[idx],
    }]);
    showToast("success", "Đã thêm vào TKB!", `${form.code} · ${DAYS[form.day]}`);
    setForm({ day: 0, slot: 1, code: "", name: "", room: "", gv: "" });
    setShowForm(false);
  }

  function removeEntry(id) {
    const e = schedule.find((s) => s.id === id);
    setSchedule((prev) => prev.filter((s) => s.id !== id));
    showToast("info", "Đã xóa khỏi TKB", e?.code);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ color: "#1e293b" }}>Quản lý Thời khóa biểu</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
            Lập và điều chỉnh thời khóa biểu toàn trường — UC11
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: "#065f46", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
        >
          <Plus size={16} /> Thêm lịch học
        </button>
      </div>

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
            {[
              { key: "code", label: "Mã lớp HP",   placeholder: "VD: CSC501-L01" },
              { key: "name", label: "Tên môn học",  placeholder: "VD: Học máy" },
              { key: "room", label: "Phòng học",    placeholder: "VD: B401" },
              { key: "gv",   label: "Giảng viên",   placeholder: "VD: TS. Nguyễn A" },
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