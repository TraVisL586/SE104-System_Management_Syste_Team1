import { createContext, useContext, useState } from "react";

/**
 * Dữ liệu giả lập (Mock Data) cho các loại người dùng
 */
export const DEMO_USERS = {
  STUDENT:{
    name: "Nguyễn Thị Lan",
    id: "SV.2023.00847",
    role: "STUDENT",
    email: "lan.nguyen@student.edu.vn",
    department: "Khoa CNTT",
    avatarInitials: "NL",
  },
  LECTURER: {
    name: "GS. Nguyễn Văn An",
    id: "GV.2015.00124",
    role: "LECTURER",
    email: "an.nguyen@edu.vn",
    department: "Khoa CNTT",
    avatarInitials: "NA",
  },
  ADMIN: {
    name: "Trần Minh Khoa",
    id: "AD.2020.00031",
    role: "ADMIN",
    email: "khoa.tran@admin.edu.vn",
    department: "Phòng Đào tạo",
    avatarInitials: "TK",
  },
  ACADEMIC_ADVISOR: {
    name: "TS. Phạm Thị Hoa",
    id: "TV.2018.00056",
    role: "ACADEMIC_ADVISOR",
    email: "hoa.pham@edu.vn",
    department: "Phòng Cố vấn Học tập",
    avatarInitials: "PH",
  },
  PUBLIC: {
    name: "Khách",
    id: "public",
    role: "PUBLIC",
    email: "",
    department: "",
    avatarInitials: "KH",
  },
};

export const ROLE_LABELS = {
  STUDENT: "Sinh viên",
  LECTURER: "Giảng viên",
  ADMIN: "Quản trị Đào tạo",
  ACADEMIC_ADVISOR: "Cố vấn Học tập",
  PUBLIC: "Người dùng công khai",
};

export const ROLE_COLORS = {
  STUDENT: { bg: "#1a3461", color: "#2563eb", light: "#dbeafe" },
  LECTURER: { bg: "#5b21b6", color: "#8b5cf6", light: "#ede9fe" },
  ADMIN: { bg: "#065f46", color: "#10b981", light: "#d1fae5" },
  ACADEMIC_ADVISOR: { bg: "#92400e", color: "#f59e0b", light: "#fef3c7" },
  PUBLIC: { bg: "#334155", color: "#64748b", light: "#f1f5f9" },
};

// Khởi tạo Context
const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  // Khởi tạo user từ localStorage để khi F5 trang không bị mất login
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sms_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (roleInput) => {

    const role = roleInput?.toUpperCase();

    if (DEMO_USERS[role]) {
      const userData = DEMO_USERS[role];
      setUser(userData);

      localStorage.setItem('sms_user', JSON.stringify(userData));
      localStorage.setItem('sms_access_token', 'demo-token-123');
    } else {
      console.error(`Role "${roleInput}" không tồn tại.`);
    }
  };


  const logout = () => {
    setUser(null);
    // Xóa sạch dấu vết khi logout
    localStorage.removeItem('sms_user');
    localStorage.removeItem('sms_access_token');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || "PUBLIC",
    login,
    logout,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole phải được sử dụng trong một RoleProvider");
  }
  return context;
}