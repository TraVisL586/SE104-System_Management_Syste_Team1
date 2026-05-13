import React from 'react';
import { Navigate } from 'react-router-dom'; // ĐẢM BẢO CÓ DÒNG NÀY

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem('sms_access_token');
  const userJson = localStorage.getItem('sms_user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Ép role của user về chữ thường để so sánh an toàn
    const role = (user.role || '').toLowerCase(); 
    
    // Ép toàn bộ mảng allowedRoles về chữ thường
    const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());

    if (!normalizedAllowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}