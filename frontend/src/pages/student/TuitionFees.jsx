import { useState } from "react";
import { CreditCard, AlertTriangle, CheckCircle2, Clock, Download } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const FEES = [
  { id: "F001", label: "Học phí HK2 2025-2026 (đợt 1)", amount: 6000000, due: "15/04/2026", status: "paid",    paidDate: "10/04/2026", method: "MoMo" },
  { id: "F002", label: "Học phí HK2 2025-2026 (đợt 2)", amount: 4200000, due: "30/05/2026", status: "pending", paidDate: null,         method: null },
  { id: "F003", label: "Học phí HK1 2025-2026",          amount: 9800000, due: "15/09/2025", status: "paid",    paidDate: "12/09/2025", method: "Stripe" },
  { id: "F004", label: "Phí ký túc xá HK2",              amount: 2400000, due: "01/04/2026", status: "paid",    paidDate: "28/03/2026", method: "MoMo" },
];

const STATUS_CFG = {
  paid:    { label: "Đã thanh toán", color: "#10b981", bg: "#d1fae5", icon: CheckCircle2 },
  pending: { label: "Chưa thanh toán", color: "#f59e0b", bg: "#fef3c7", icon: AlertTriangle },
  overdue: { label: "Quá hạn",       color: "#ef4444", bg: "#fee2e2", icon: AlertTriangle },
};

const fmt = (n) => n.toLocaleString("vi-VN") + "₫";

export function TuitionFees() {
  const [paying, setPaying] = useState(null);
  const [method, setMethod] = useState("momo");
  const { showToast } = useToast();

  const pending  = FEES.filter((f) => f.status === "pending");
  const totalDue = pending.reduce((s, f) => s + f.amount, 0);
  const totalPaid = FEES.filter((f) => f.status === "paid").reduce((s, f) => s + f.amount, 0);

  function handlePay(fee) {
    setPaying(fee);
    setMethod("momo");
  }

  function confirmPayment() {
    showToast("success", "Thanh toán thành công!", `${fmt(paying.amount)} qua ${method === "momo" ? "MoMo" : "Stripe"} (BR-15). Biên lai gửi qua email.`);
    setPaying(null);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ color: "#1e293b" }}>Học phí</h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 2 }}>
          Năm học 2025/2026 · Thanh toán qua MoMo hoặc Stripe (BR-15) · Đơn vị: VNĐ
        </p>
      </div>

      {/* Alert */}
      {totalDue > 0 && (
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={{ backgroundColor: "#fef3c7", border: "1px solid #fde68a" }}>
          <AlertTriangle size={20} color="#f59e0b" />
          <div className="flex-1">
            <p style={{ fontWeight: 700, color: "#92400e" }}>Cảnh báo nợ học phí (BR-6)</p>
            <p style={{ fontSize: "0.82rem", color: "#92400e", marginTop: 2 }}>
              Bạn còn <strong>{fmt(totalDue)}</strong> chưa thanh toán. Vui lòng hoàn tất trước hạn để tránh bị khóa đăng ký môn.
            </p>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Tổng phải đóng",  value: fmt(totalDue + totalPaid), color: "#1e293b", bg: "#f8fafc" },
          { label: "Đã thanh toán",   value: fmt(totalPaid),            color: "#10b981", bg: "#d1fae5" },
          { label: "Còn phải đóng",   value: fmt(totalDue),             color: "#f59e0b", bg: "#fef3c7" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: bg, border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "0.78rem", color: "#64748b" }}>{label}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color, marginTop: 4 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Fee list */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Chi tiết học phí</p>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ fontSize: "0.75rem", color: "#475569", border: "1px solid #e2e8f0", background: "none", cursor: "pointer" }}>
            <Download size={13} /> Xuất PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 640 }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["Khoản phí", "Số tiền", "Hạn nộp", "Trạng thái", "Thanh toán qua", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3" style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEES.map((fee) => {
                const cfg  = STATUS_CFG[fee.status];
                const Icon = cfg.icon;
                return (
                  <tr key={fee.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td className="px-5 py-4">
                      <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "#1e293b" }}>{fee.label}</p>
                    </td>
                    <td className="px-5 py-4" style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
                      {fmt(fee.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} color="#94a3b8" />
                        <span style={{ fontSize: "0.78rem", color: "#475569" }}>{fee.due}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: "0.72rem", fontWeight: 600 }}>
                        <Icon size={10} /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4" style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {fee.method ?? "—"}
                      {fee.paidDate && <p style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{fee.paidDate}</p>}
                    </td>
                    <td className="px-5 py-4">
                      {fee.status === "pending" && (
                        <button
                          onClick={() => handlePay(fee)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl"
                          style={{ backgroundColor: "#1a3461", color: "white", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}
                        >
                          <CreditCard size={13} /> Thanh toán
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

      {/* Payment modal */}
      {paying && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 20, padding: 28, maxWidth: 440, width: "100%", boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
            <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e293b", marginBottom: 4 }}>Xác nhận Thanh toán</p>
            <p style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: 20 }}>{paying.label}</p>

            <div className="rounded-xl p-4 mb-5" style={{ backgroundColor: "#f8fafc" }}>
              <div className="flex justify-between">
                <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Số tiền</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b" }}>{fmt(paying.amount)}</span>
              </div>
            </div>

            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: 10 }}>Chọn phương thức thanh toán (BR-15)</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { key: "momo",   label: "MoMo",   color: "#e91e8c", desc: "Ví điện tử MoMo" },
                { key: "stripe", label: "Stripe", color: "#635bff", desc: "Thẻ tín dụng / Stripe" },
              ].map(({ key, label, color, desc }) => (
                <button
                  key={key}
                  onClick={() => setMethod(key)}
                  style={{
                    padding: "14px 12px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                    border: `2px solid ${method === key ? color : "#e2e8f0"}`,
                    backgroundColor: method === key ? `${color}10` : "#fff",
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color }}>{label}</p>
                  <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 2 }}>{desc}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPaying(null)}
                className="flex-1 py-2.5 rounded-xl"
                style={{ border: "1px solid #e2e8f0", background: "none", cursor: "pointer", fontSize: "0.85rem", color: "#475569" }}
              >
                Hủy
              </button>
              <button
                onClick={confirmPayment}
                className="flex-1 py-2.5 rounded-xl"
                style={{ backgroundColor: "#1a3461", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TuitionFees;