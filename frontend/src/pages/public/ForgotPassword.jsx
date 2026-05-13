import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-blue-700">Quên mật khẩu</h1>
        <p className="mt-2 text-sm text-slate-500">Nhập email để nhận hướng dẫn đặt lại mật khẩu.</p>

        {sent ? (
          <p className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            Đã gửi hướng dẫn tới email của bạn.
          </p>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Gửi yêu cầu
            </button>
          </form>
        )}

        <Link to="/login" className="mt-4 block text-center text-sm text-blue-600 hover:underline">
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;