import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute checks for presence of an auth token and optional allowedRoles.
// Usage: <ProtectedRoute allowedRoles={[ 'STUDENT' ]}><MyComponent/></ProtectedRoute>
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem('sms_access_token');
  const userJson = localStorage.getItem('sms_user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (!token || !user) {
    // Not authenticated -> go to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = user.role || '';
    if (!allowedRoles.includes(role)) {
      // Authenticated but not authorized -> redirect to dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
