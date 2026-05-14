import { useState } from "react";
import { Search, BookOpen, Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const MAX_TC = 24;

const CATALOG = [
  { code: "CSC501", name: "Học máy",                tc: 3, gv: "GS. Trần Minh Tú",     khoa: "CNTT",  slots: 35, enrolled: 28, prereq: "CSC401" },
  { code: "CSC502", name: "Lập trình Di động",      tc: 3, gv: "TS. Lê Văn Hải",        khoa: "CNTT",  slots: 40, enrolled: 40, prereq: "CSC312" },
  { code: "CSC503", name: "Điện toán Đám mây",      tc: 3, gv: "PGS. Phạm Ngọc Anh",   khoa: "CNTT",  slots: 30, enrolled: 22, prereq: null },
  { code: "MTH401", name: "Phương trình Vi phân",   tc: 3, gv: "TS. Nguyễn Thu Hà",     khoa: "Toán",  slots: 50, enrolled: 37, prereq: "MTH302" },
  { code: "ENG301", name: "Tiếng Anh Học thuật",    tc: 2, gv: "ThS. Đinh Thị Lan",     khoa: "Ngoại ngữ", slots: 45, enrolled: 31, prereq: null },
  { code: "CSC480", name: "Bảo mật Hệ thống",       tc: 3, gv: "TS. Hoàng Văn Đức",    khoa: "CNTT",  slots: 35, enrolled: 29, prereq: "CSC312" },
  { code: "CSC490", name: "Đồ án Tốt nghiệp I",     tc: 3, gv: "GS. Nguyễn Văn An",    khoa: "CNTT",  slots: 20, enrolled: 18, prereq: "CSC420" },
  { code: "BUS201", name: "Quản trị Doanh nghiệp",  tc: 2, gv: "ThS. Trần Thị Mai",     khoa: "Kinh tế", slots: 60, enrolled: 44, prereq: null },
];

const ALREADY_ENROLLED = ["CSC401", "MTH302", "CSC312", "ENG201", "CSC420", "CSC380"];

export function Registrations() {
  const [search, setSearch]       = useState("");
  const [cart,   setCart]         = useState([]);
  const [khoa,   setKhoa]         = useState("Tất cả");
  const { showToast }             = useToast();

  const enrolledTC = 17; // current semester
  const cartTC     = cart.reduce((s, c) => s + c.tc, 0);
  const totalTC    = enrolledTC + cartTC;

  const KHOAS = ["Tất cả", "CNTT", "Toán", "Ngoại ngữ", "Kinh tế"];

  const filtered = CATALOG.filter((c) => {
    const matchS = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchK = khoa === "Tất cả" || c.khoa === khoa;
    return matchS && matchK;
  });

  function addToCart(course) {
    if (ALREADY_ENROLLED.includes(course.code)) {
      showToast("warning", "Đã đăng ký", `Bạn đã đăng ký môn ${course.name} rồi.`);
      return;
    }
    if (cart.find((c) => c.code === course.code)) {
      showToast("warning", "Đã chọn", `${course.name} đã được chọn trước đó.`);
      return;
    }
    if (totalTC + course.tc > MAX_TC) {
      showToast("error", "Vượt giới hạn tín chỉ (BR-2)", `Đăng ký thêm ${course.tc} TC sẽ vượt mức tối đa ${MAX_TC} TC trong học kỳ.`);
      return;
    }
    if (course.enrolled >= course.slots) {
      showToast("error", "Lớp đã đầy", `${course.name} không còn chỗ trống.`);
      return;
    }
    setCart((prev) => [...prev, course]);
    showToast("success", "Đã thêm môn học", `${course.name} (${course.tc} TC)`);
  }

  function removeFromCart(code) {
    setCart((prev) => prev.filter((c) => c.code !== code));
  }

  function submitRegistration() {
    if (cart.length === 0) {
      showToast("warning", "Danh mục đăng  trống", "Vui lòng chọn ít nhất một môn học.");
      return;
    }
    showToast("success", "Đăng ký thành công!", `Đã đăng ký ${cart.length} môn học (${cartTC} TC).`);
    setCart([]);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Đăng ký Môn học</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Học kỳ 2 — 2025/2026 · Đã đăng ký: {enrolledTC} TC · Tối đa: {MAX_TC} TC (BR-2)
        </p>
      </div>

      {/* Credit meter */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center justify-between mb-2">
          <p style={{ fontSize: "0.82rem", color: "#334155", fontWeight: 600 }}>
            Tín chỉ học kỳ: <span style={{ color: totalTC > MAX_TC ? "#ef4444" : "#2563eb" }}>{totalTC}</span> / {MAX_TC}
          </p>
          <span style={{ fontSize: "0.72rem", color: totalTC > 20 ? "#f59e0b" : "#10b981", fontWeight: 600 }}>
            {totalTC > MAX_TC ? "⚠ Vượt giới hạn!" : `Còn ${MAX_TC - totalTC} TC`}
          </span>
        </div>
        <div style={{ height: 8, backgroundColor: "#e2e8f0", borderRadius: 9999, overflow: "hidden" }}>
          <div style={{
            width: `${Math.min((totalTC / MAX_TC) * 100, 100)}%`,
            height: "100%",
            backgroundColor: totalTC > MAX_TC ? "#ef4444" : totalTC > 20 ? "#f59e0b" : "#2563eb",
            borderRadius: 9999, transition: "width 0.3s",
          }} />
        </div>
        <div className="flex justify-between mt-1">
          <p style={{ fontSize: "0.65rem", color: "#94a3b8" }}>Đang học: {enrolledTC} TC</p>
          <p style={{ fontSize: "0.65rem", color: "#94a3b8" }}>Giỏ: +{cartTC} TC</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Course catalog */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-3">
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                placeholder="Tìm mã hoặc tên môn học…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 12, border: "1px solid #e2e8f0", fontSize: "0.82rem", outline: "none" }}
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {KHOAS.map((k) => (
                <button
                  key={k}
                  onClick={() => setKhoa(k)}
                  style={{
                    padding: "6px 12px", borderRadius: 9999, fontSize: "0.75rem",
                    backgroundColor: khoa === k ? "#1a3461" : "#f1f5f9",
                    color: khoa === k ? "#fff" : "#475569",
                    border: "none", cursor: "pointer", fontWeight: khoa === k ? 600 : 400,
                  }}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
            <table className="w-full" style={{ backgroundColor: "#fff" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  {["Mã MH", "Tên môn học", "TC", "Giảng viên", "Chỗ trống", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const isEnrolled = ALREADY_ENROLLED.includes(c.code);
                  const inCart     = cart.find((x) => x.code === c.code);
                  const full       = c.enrolled >= c.slots;
                  return (
                    <tr key={c.code} style={{ borderTop: "1px solid #f1f5f9", opacity: isEnrolled ? 0.5 : 1 }}>
                      <td className="px-4 py-3" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#2563eb", fontWeight: 600 }}>{c.code}</td>
                      <td className="px-4 py-3">
                        <p style={{ fontSize: "0.82rem", color: "#1e293b", fontWeight: 500 }}>{c.name}</p>
                        {c.prereq && <p style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Tiên quyết: {c.prereq}</p>}
                      </td>
                      <td className="px-4 py-3" style={{ fontSize: "0.78rem", color: "#475569" }}>{c.tc}</td>
                      <td className="px-4 py-3" style={{ fontSize: "0.75rem", color: "#64748b" }}>{c.gv}</td>
                      <td className="px-4 py-3">
                        <span style={{ fontSize: "0.72rem", color: full ? "#ef4444" : "#10b981", fontWeight: 600 }}>
                          {full ? "Hết chỗ" : `${c.slots - c.enrolled} chỗ`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {isEnrolled ? (
                          <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 600 }}>✓ Đã học</span>
                        ) : inCart ? (
                          <span style={{ fontSize: "0.7rem", color: "#8b5cf6", fontWeight: 600 }}>✓ Trong giỏ</span>
                        ) : (
                          <button
                            onClick={() => addToCart(c)}
                            disabled={full}
                            style={{
                              display: "flex", alignItems: "center", gap: 4,
                              padding: "4px 10px", borderRadius: 8,
                              backgroundColor: full ? "#f1f5f9" : "#dbeafe",
                              color: full ? "#94a3b8" : "#2563eb",
                              border: "none", cursor: full ? "not-allowed" : "pointer",
                              fontSize: "0.75rem", fontWeight: 600,
                            }}
                          >
                            <Plus size={12} /> Thêm
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart */}
        <div className="rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", alignSelf: "start" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Giỏ Đăng ký</p>
            <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{cart.length} môn · {cartTC} TC</p>
          </div>
          {cart.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <BookOpen size={28} color="#cbd5e1" style={{ margin: "0 auto 8px" }} />
              <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Chưa chọn môn học nào</p>
            </div>
          ) : (
            <div>
              {cart.map((c) => (
                <div key={c.code} className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1e293b" }}>{c.name}</p>
                    <p style={{ fontSize: "0.7rem", color: "#64748b" }}>{c.code} · {c.tc} TC</p>
                  </div>
                  <button onClick={() => removeFromCart(c.code)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Trash2 size={14} color="#ef4444" />
                  </button>
                </div>
              ))}
              <div className="px-4 py-4">
                {totalTC > MAX_TC && (
                  <div className="flex items-center gap-2 p-3 rounded-xl mb-3" style={{ backgroundColor: "#fef2f2" }}>
                    <AlertTriangle size={14} color="#ef4444" />
                    <p style={{ fontSize: "0.75rem", color: "#991b1b" }}>Vượt giới hạn {MAX_TC} TC!</p>
                  </div>
                )}
                <button
                  onClick={submitRegistration}
                  disabled={totalTC > MAX_TC}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl"
                  style={{
                    backgroundColor: totalTC > MAX_TC ? "#e2e8f0" : "#1a3461",
                    color: totalTC > MAX_TC ? "#94a3b8" : "white",
                    border: "none", cursor: totalTC > MAX_TC ? "not-allowed" : "pointer",
                    fontSize: "0.85rem", fontWeight: 600,
                  }}
                >
                  <CheckCircle2 size={16} />
                  Xác nhận Đăng ký
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Registrations;