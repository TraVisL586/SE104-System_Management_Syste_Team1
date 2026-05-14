import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, ChevronDown, User, LogOut, Settings, Shield,
         BookOpen, Users, Globe, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const ROLE_LABELS = {
  STUDENT:  "Sinh viên",
  LECTURER: "Giảng viên",
  ADMIN:    "Quản trị Đào tạo",
  ACADEMIC_ADVISOR:  "Cố vấn Học tập",
  PUBLIC:   "Công khai",
};

const ROLE_COLORS = {
  STUDENT:  { bg: "#1a3461", color: "#2563eb", light: "#dbeafe" },
  LECTURER: { bg: "#5b21b6", color: "#8b5cf6", light: "#ede9fe" },
  ADMIN:    { bg: "#065f46", color: "#10b981", light: "#d1fae5" },
  ACADEMIC_ADVISOR:  { bg: "#92400e", color: "#f59e0b", light: "#fef3c7" },
  PUBLIC:   { bg: "#334155", color: "#64748b", light: "#f1f5f9" },
};

const DEMO_USERS = {
  STUDENT:  { name: "Nguyễn Thị Lan",   id: "SV.2023.00847", avatarInitials: "NL" },
  LECTURER: { name: "GS. Nguyễn Văn An", id: "GV.2015.00124", avatarInitials: "NA" },
  ADMIN:    { name: "Trần Minh Khoa",    id: "AD.2020.00031", avatarInitials: "TK" },
  ACADEMIC_ADVISOR:  { name: "TS. Phạm Thị Hoa",  id: "TV.2018.00056", avatarInitials: "PH" },
  PUBLIC:   { name: "Khách",             id: "PUBLIC",        avatarInitials: "KH" },
};

const SWITCH_ROLES = [
  { role: "STUDENT",  label: "Sinh viên",         icon: BookOpen },
  { role: "LECTURER", label: "Giảng viên",         icon: Users },
  { role: "ADMIN",    label: "Quản trị Đào tạo",   icon: Shield },
  { role: "ACADEMIC_ADVISOR",  label: "Cố vấn Học tập",     icon: UserCheck },
  { role: "PUBLIC",   label: "Công khai",           icon: Globe },
];

const NOTIFICATIONS = [
  { id: 1, title: "Điểm đã công bố",    message: "Điểm giữa kỳ CSC 301 đã được công bố.",    time: "2 phút trước", unread: true,  color: "#10b981" },
  { id: 2, title: "Nhắc đăng ký môn",  message: "Đăng ký môn học HK2 mở trong 3 ngày.",     time: "1 giờ trước",  unread: true,  color: "#f59e0b" },
  { id: 3, title: "Nhắc học phí",      message: "Hạn nộp học phí: 30/05/2026.",              time: "Hôm qua",      unread: false, color: "#ef4444" },
  { id: 4, title: "Yêu cầu được duyệt", message: "Đơn xin nghỉ học tạm thời đã được duyệt.", time: "2 ngày trước", unread: false, color: "#2563eb" },
];

export function TopNav({ onMenuToggle }) {
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [switchOpen,  setSwitchOpen]  = useState(false);
  const [searchVal,   setSearchVal]   = useState("");
  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const navigate   = useNavigate();
  const { user, login, logout } = useRole();

  const role = user?.role || "PUBLIC";
  const roleColor = ROLE_COLORS[role.toUpperCase()] || ROLE_COLORS.PUBLIC;
  const unread = 0;

  useEffect(() => {
    function handler(e) {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
        setSwitchOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function switchRole(r) {
    login(r);
    setSwitchOpen(false);
    setProfileOpen(false);
    navigate("/");
  }

  return (
    <header
      className="flex items-center gap-4 px-4 lg:px-6"
      style={{
        height: 64, backgroundColor: "#fff",
        borderBottom: "1px solid #e2e8f0",
        flexShrink: 0, position: "relative", zIndex: 10,
      }}
    >
      <button
        onClick={onMenuToggle}
        className="lg:hidden"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <Menu size={20} color="#475569" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md" style={{ position: "relative" }}>
        <Search
          size={15} color="#94a3b8"
          style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        />
        <input
          type="text"
          placeholder="Tìm kiếm sinh viên, môn học, yêu cầu…"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          style={{
            width: "100%", paddingLeft: 36, paddingRight: 16,
            paddingTop: 8, paddingBottom: 8,
            borderRadius: 12, border: "1px solid #e2e8f0",
            fontSize: "0.82rem", backgroundColor: "#f8fafc",
            color: "#334155", outline: "none",
          }}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Demo Role Switcher */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setSwitchOpen((v) => !v); setNotifOpen(false); setProfileOpen(false); }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{
              backgroundColor: roleColor.light,
              border: `1px solid ${roleColor.color}30`,
              cursor: "pointer",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 9999, backgroundColor: roleColor.color }} />
            <span style={{ fontSize: "0.72rem", color: roleColor.color, fontWeight: 700 }}>
              Demo: {ROLE_LABELS[role]}
            </span>
            <ChevronDown size={11} color={roleColor.color} />
          </button>
          {switchOpen && (
            <div style={{
              position: "absolute", right: 0, top: 44, width: 230,
              backgroundColor: "#fff", border: "1px solid #e2e8f0",
              borderRadius: 16, boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              zIndex: 60, overflow: "hidden",
            }}>
              <p style={{ fontSize: "0.62rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "10px 14px 4px" }}>
                Chuyển vai trò Demo
              </p>
              {SWITCH_ROLES.map(({ role: r, label, icon: Icon }) => {
                const rc = ROLE_COLORS[r];
                return (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className="w-full flex items-center gap-3 px-4 py-2.5"
                    style={{
                      background: r === role ? rc.light : "none",
                      border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      backgroundColor: rc.light,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={14} color={rc.color} />
                    </div>
                    <span style={{ fontSize: "0.82rem", color: r === role ? rc.color : "#334155", fontWeight: r === role ? 700 : 400 }}>
                      {label}
                    </span>
                    {r === role && (
                      <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 9999, backgroundColor: rc.color }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); setSwitchOpen(false); }}
            style={{
              position: "relative", width: 40, height: 40,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 12, background: "none", border: "none", cursor: "pointer",
            }}
          >
            <Bell size={19} color="#475569" />
            {unread > 0 && (
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 17, height: 17, borderRadius: 9999,
                backgroundColor: "#ef4444", color: "white",
                fontSize: "0.58rem", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {unread}
              </span>
            )}
          </button>
          {notifOpen && (
            <div style={{
              position: "absolute", right: 0, top: 52, width: 340,
              backgroundColor: "#fff", border: "1px solid #e2e8f0",
              borderRadius: 16, boxShadow: "0 20px 40px rgba(0,0,0,0.12)", zIndex: 50,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1e293b" }}>Thông báo</p>
                <span style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 9999 }}>
                  {unread} mới
                </span>
              </div>
              <div style={{ maxHeight: 288, overflowY: "auto" }}>
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} style={{
                    display: "flex", gap: 12, padding: "12px 16px",
                    borderBottom: "1px solid #f1f5f9",
                    backgroundColor: n.unread ? "#fafbff" : "#fff", cursor: "pointer",
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: 9999, backgroundColor: n.unread ? n.color : "#cbd5e1", flexShrink: 0, marginTop: 6 }} />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "#1e293b" }}>{n.title}</p>
                      <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 2 }}>{n.message}</p>
                      <p style={{ fontSize: "0.65rem", color: "#94a3b8", marginTop: 4 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "10px 16px", textAlign: "center" }}>
                <button style={{ fontSize: "0.78rem", color: "#2563eb", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>
                  Xem tất cả thông báo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); setSwitchOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 12px", borderRadius: 12, cursor: "pointer", border: "none", background: "none" }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 9999,
              background: `linear-gradient(135deg, ${roleColor.bg}, ${roleColor.color})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "0.78rem", fontWeight: 700,
            }}>
              {user?.avatarInitials ?? "?"}
            </div>
            <div className="hidden sm:block" style={{ textAlign: "left" }}>
              <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "#1e293b", lineHeight: 1.2 }}>
                {user?.name ?? "Khách"}
              </p>
              <div className="flex items-center gap-1">
                <span style={{ width: 6, height: 6, borderRadius: 9999, backgroundColor: roleColor.color, display: "inline-block" }} />
                <p style={{ fontSize: "0.65rem", color: roleColor.color, fontWeight: 600, lineHeight: 1.2 }}>
                  {ROLE_LABELS[role]}
                </p>
              </div>
            </div>
            <ChevronDown size={13} color="#94a3b8" className="hidden sm:block" />
          </button>

          {profileOpen && (
            <div style={{
              position: "absolute", right: 0, top: 52, width: 260,
              backgroundColor: "#fff", border: "1px solid #e2e8f0",
              borderRadius: 16, boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              zIndex: 50, overflow: "hidden",
            }}>
              <div style={{ padding: "14px 16px", backgroundColor: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 42, height: 42, borderRadius: 9999,
                    background: `linear-gradient(135deg,${roleColor.bg},${roleColor.color})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontSize: "0.9rem", fontWeight: 700,
                  }}>
                    {user?.avatarInitials ?? "?"}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#1e293b" }}>{user?.name}</p>
                    <p style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "monospace" }}>{user?.id}</p>
                    <span style={{
                      display: "inline-block", backgroundColor: roleColor.light, color: roleColor.color,
                      fontSize: "0.62rem", fontWeight: 700, padding: "1px 8px", borderRadius: 9999, marginTop: 3,
                    }}>
                      {ROLE_LABELS[role]}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "6px 0" }}>
                {[
                  { icon: User,     label: "Hồ sơ cá nhân",    action: () => { navigate("/profile"); setProfileOpen(false); } },
                  { icon: Settings, label: "Cài đặt tài khoản", action: () => {} },
                  { icon: Shield,   label: "Bảo mật",           action: () => {} },
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  >
                    <Icon size={15} color="#64748b" />
                    <span style={{ fontSize: "0.82rem", color: "#334155" }}>{label}</span>
                  </button>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #f1f5f9", padding: "6px 0" }}>
                <button
                  onClick={() => { logout(); navigate("/login"); setProfileOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <LogOut size={15} color="#ef4444" />
                  <span style={{ fontSize: "0.82rem", color: "#ef4444" }}>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </header>
  );
}
