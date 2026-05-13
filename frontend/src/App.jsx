import { RouterProvider } from "react-router";
import  router  from "./routes/AppRoutes";
import { RoleProvider } from "./context/RoleContext";
import { ToastProvider } from "./context/ToastContext";

/**
 * App Component: Gốc rễ của ứng dụng.
 * Đây là nơi "bọc" các Provider toàn cục để truyền dữ liệu xuống dưới.
 */
export default function App() {
  return (
    // Quản lý quyền hạn/vai trò người dùng (Admin, User, Editor, v.v.)
    <RoleProvider>
      {/* Quản lý trạng thái và hiển thị thông báo (Toast) */}
      <ToastProvider>
        {/* Bộ định tuyến của ứng dụng (React Router v6/v7) */}
        <RouterProvider router={router} />
      </ToastProvider>
    </RoleProvider>
  );
}
