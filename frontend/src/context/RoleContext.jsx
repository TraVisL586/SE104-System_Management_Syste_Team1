import { createContext, useContext, useState } from "react";

/**
 * Dữ liệu giả lập (Mock Data) cho các loại người dùng
 */
export const DEMO_USERS = {
  student: {
    name: "Nguyễn Thị Lan",
    id: "SV.2023.00847",
    role: "student",
    email: "lan.nguyen@student.edu.vn",
    department: "Khoa CNTT",
    avatarInitials: "NL",
  },
  lecturer: {
    name: "GS. Nguyễn Văn An",
    id: "GV.2015.00124",
    role: "lecturer",
    email: "an.nguyen@edu.vn",
    department: "Khoa CNTT",
    avatarInitials: "NA",
  },
  admin: {
    name: "Trần Minh Khoa",
    id: "AD.2020.00031",
    role: "admin",
    email: "khoa.tran@admin.edu.vn",
    department: "Phòng Đào tạo",
    avatarInitials: "TK",
  },
  advisor: {
    name: "TS. Phạm Thị Hoa",
    id: "TV.2018.00056",
    role: "advisor",
    email: "hoa.pham@edu.vn",
    department: "Phòng Cố vấn Học tập",
    avatarInitials: "PH",
  },
  public: {
    name: "Khách",
    id: "PUBLIC",
    role: "public",
    email: "",
    department: "",
    avatarInitials: "KH",
  },
};

export const ROLE_LABELS = {
  student: "Sinh viên",
  lecturer: "Giảng viên",
  admin: "Quản trị Đào tạo",
  advisor: "Cố vấn Học tập",
  public: "Người dùng công khai",
};

export const ROLE_COLORS = {
  student: { bg: "#1a3461", color: "#2563eb", light: "#dbeafe" },
  lecturer: { bg: "#5b21b6", color: "#8b5cf6", light: "#ede9fe" },
  admin: { bg: "#065f46", color: "#10b981", light: "#d1fae5" },
  advisor: { bg: "#92400e", color: "#f59e0b", light: "#fef3c7" },
  public: { bg: "#334155", color: "#64748b", light: "#f1f5f9" },
};

// Khởi tạo Context
const RoleContext = createContext(null);

/**
 * Provider component để bọc ngoài ứng dụng (thường là ở main.jsx hoặc App.jsx)
 */
export function RoleProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (role) => {
    // Kiểm tra xem role có tồn tại trong DEMO_USERS không
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
    } else {
      console.error(`Role "${role}" không tồn tại trong hệ thống.`);
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Giá trị trả về cho các component tiêu thụ context
  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || "public",
    login,
    logout,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

/**
 * Hook tùy chỉnh để sử dụng RoleContext nhanh hơn
 */
export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole phải được sử dụng trong một RoleProvider");
  }
  return context;
}