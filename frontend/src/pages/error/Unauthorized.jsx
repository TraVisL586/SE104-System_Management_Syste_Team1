import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="text-6xl font-bold text-red-500">403</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Không có quyền truy cập</h1>
        <p className="mt-3 text-slate-500">Bạn không có quyền truy cập trang này.</p>
        <Link
          to="/login"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Về trang đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;