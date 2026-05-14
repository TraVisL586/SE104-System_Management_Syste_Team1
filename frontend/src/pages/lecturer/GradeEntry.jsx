import { useState } from "react";
import { Save, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const CLASSES = [
  { code: "CSC401-L01", name: "Hệ điều hành (L01)",      locked: false },
  { code: "CSC401-L02", name: "Hệ điều hành (L02)",      locked: false },
  { code: "CSC420-L01", name: "Trí tuệ Nhân tạo (L01)", locked: true  },
];

const INIT_STUDENTS = [
  { id: "SV.2023.00001", name: "Nguyễn Thị Lan",   gk: "8.5",  ck: "" },
  { id: "SV.2023.00002", name: "Trần Văn Bình",     gk: "7.0",  ck: "" },
  { id: "SV.2023.00003", name: "Lê Minh Châu",      gk: "9.0",  ck: "" },
  { id: "SV.2023.00004", name: "Phạm Thu Dung",      gk: "6.5",  ck: "" },
  { id: "SV.2023.00005", name: "Hoàng Văn Em",       gk: "8.0",  ck: "" },
  { id: "SV.2023.00006", name: "Vũ Thị Phượng",      gk: "7.5",  ck: "" },
  { id: "SV.2023.00007", name: "Đỗ Quang Giang",     gk: "5.0",  ck: "" },
  { id: "SV.2023.00008", name: "Bùi Thị Hoa",        gk: "9.5",  ck: "" },
  { id: "SV.2023.00009", name: "Ngô Văn Inh",        gk: "7.0",  ck: "" },
  { id: "SV.2023.00010", name: "Đinh Thị Kim",       gk: "8.5",  ck: "" },
];

function calcFinal(gk, ck) {
  const g = parseFloat(gk);
  const c = parseFloat(ck);
  if (isNaN(g) || isNaN(c)) return null;
  return (g * 0.3 + c * 0.7).toFixed(1);
}

function validateScore(val) {
  if (val === "" || val === null) return true;
  const n = parseFloat(val);
  return !isNaN(n) && n >= 0 && n <= 10;
}

function gradeColor(g) {
  if (g === null) return "#94a3b8";
  if (g >= 8.5) return "#10b981";
  if (g >= 7.0) return "#2563eb";
  if (g >= 5.5) return "#f59e0b";
  return "#ef4444";
}

export function GradeEntry() {
  const [selected, setSelected] = useState("CSC401-L01");
  const [grades,   setGrades]   = useState(INIT_STUDENTS.map((s) => ({ ...s })));
  const [type,     setType]     = useState("cuoiky"); // "giuaky" | "cuoiky"
  const { showToast } = useToast();

  const cls = CLASSES.find((c) => c.code === selected);

  function update(id, field, val) {
    setGrades((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  }

  function saveGrades() {
    const invalid = grades.filter(
      (s) => !validateScore(type === "cuoiky" ? s.ck : s.gk)
    );
    if (invalid.length) {
      showToast("error", "Điểm không hợp lệ", `${invalid.length} SV có điểm ngoài khoảng 0.0–10.0 (BR-8).`);
      return;
    }
    showToast("success", "Lưu điểm thành công!", `${cls?.name} · ${type === "cuoiky" ? "Điểm cuối kỳ" : "Điểm giữa kỳ"}`);
  }

  const filled  = grades.filter((s) => (type === "cuoiky" ? s.ck : s.gk) !== "").length;
  const total   = grades.length;

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Nhập điểm</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Nhập điểm giữa kỳ và cuối kỳ · Thang điểm 0.0–10.0 (BR-8)
        </p>
      </div>

      {/* Class + type selector */}
      <div className="flex flex-wrap gap-3">
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Lớp học phần</p>
          <div className="flex gap-2 flex-wrap">
            {CLASSES.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelected(c.code)}
                style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: "0.8rem",
                  backgroundColor: selected === c.code ? "#4c1d95" : "#fff",
                  color: selected === c.code ? "#fff" : "#334155",
                  border: `1px solid ${selected === c.code ? "#4c1d95" : "#e2e8f0"}`,
                  cursor: "pointer",
                }}
              >
                {c.code}
                {c.locked && <span style={{ marginLeft: 4, fontSize: "0.65rem" }}>🔒</span>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Loại điểm</p>
          <div className="flex gap-2">
            {[
              { key: "giuaky", label: "Giữa kỳ (30%)" },
              { key: "cuoiky", label: "Cuối kỳ (70%)" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setType(key)}
                style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: "0.8rem",
                  backgroundColor: type === key ? "#1a3461" : "#fff",
                  color: type === key ? "#fff" : "#334155",
                  border: `1px solid ${type === key ? "#1a3461" : "#e2e8f0"}`,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {cls?.locked ? (
        <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#fef3c7", border: "1px solid #fde68a" }}>
          <AlertTriangle size={16} color="#f59e0b" />
          <p style={{ fontSize: "0.82rem", color: "#92400e" }}>Lớp <strong>{cls.code}</strong> đã khóa điểm. Liên hệ Phòng Đào tạo để chỉnh sửa.</p>
        </div>
      ) : (
        <>
          {/* Info */}
          <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <Info size={15} color="#2563eb" />
            <p style={{ fontSize: "0.78rem", color: "#1e40af" }}>
              Đã nhập: <strong>{filled}/{total}</strong> SV ·
              Điểm tổng kết = Giữa kỳ × 30% + Cuối kỳ × 70% · Thang điểm 0.0–10.0 (BR-8)
            </p>
          </div>

          {/* Progress */}
          <div style={{ height: 6, backgroundColor: "#e2e8f0", borderRadius: 9999, overflow: "hidden" }}>
            <div style={{ width: `${(filled / total) * 100}%`, height: "100%", backgroundColor: "#8b5cf6", borderRadius: 9999, transition: "width 0.3s" }} />
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  {["#", "MSSV", "Họ tên", "Giữa kỳ (30%)", "Cuối kỳ (70%)", "Tổng kết", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grades.map((s, i) => {
                  const final = calcFinal(s.gk, s.ck);
                  const gkOk  = validateScore(s.gk);
                  const ckOk  = validateScore(s.ck);
                  return (
                    <tr key={s.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td className="px-4 py-2.5" style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{i + 1}</td>
                      <td className="px-4 py-2.5" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600 }}>{s.id}</td>
                      <td className="px-4 py-2.5" style={{ fontSize: "0.85rem", color: "#1e293b" }}>{s.name}</td>
                      <td className="px-4 py-2.5">
                        <input
                          value={s.gk}
                          onChange={(e) => update(s.id, "gk", e.target.value)}
                          disabled={type === "cuoiky"}
                          placeholder="0–10"
                          style={{
                            width: 72, padding: "5px 8px", borderRadius: 8, textAlign: "center",
                            border: `1px solid ${!gkOk ? "#ef4444" : "#e2e8f0"}`,
                            fontSize: "0.85rem", color: "#1e293b", outline: "none",
                            backgroundColor: type === "cuoiky" ? "#f8fafc" : "#fff",
                          }}
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <input
                          value={s.ck}
                          onChange={(e) => update(s.id, "ck", e.target.value)}
                          disabled={type === "giuaky"}
                          placeholder="0–10"
                          style={{
                            width: 72, padding: "5px 8px", borderRadius: 8, textAlign: "center",
                            border: `1px solid ${!ckOk ? "#ef4444" : "#e2e8f0"}`,
                            fontSize: "0.85rem", color: "#1e293b", outline: "none",
                            backgroundColor: type === "giuaky" ? "#f8fafc" : "#fff",
                          }}
                        />
                      </td>
                      <td className="px-4 py-2.5" style={{ fontSize: "1rem", fontWeight: 700, color: gradeColor(final ? parseFloat(final) : null) }}>
                        {final ?? "—"}
                      </td>
                      <td className="px-4 py-2.5">
                        {(!gkOk || !ckOk) && (
                          <AlertTriangle size={14} color="#ef4444" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={saveGrades}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{ backgroundColor: "#4c1d95", color: "white", border: "none", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600 }}
            >
              <Save size={16} /> Lưu điểm
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default GradeEntry;