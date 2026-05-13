import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '', // Student ID or staff email
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call the service which posts to /api/auth/login
      const data = await AuthService.login({
        identifier: formData.identifier,
        password: formData.password,
      });

      // Backend should return { token, user }
      const { token, user } = data;

      // Persist token and user for later API calls / RBAC checks
      localStorage.setItem('sms_access_token', token);
      localStorage.setItem('sms_user', JSON.stringify(user));

      // RBAC redirect logic based on the user's role.
      // The role values are expected from backend to be one of: STUDENT, LECTURER, ACADEMIC_ADMIN, IT_ADMIN
      // Map each role to the appropriate landing page.
      const role = (user && user.role) || '';

      switch (role) {
        case 'STUDENT':
          // Students go to the course registration area
          navigate('/student/registrations');
          break;
        case 'LECTURER':
          // Lecturers land on the grade input workflow
          navigate('/lecturer/grades');
          break;
        case 'ACADEMIC_ADMIN':
          // Academic admins manage course sections
          navigate('/admin/course-sections');
          break;
        case 'IT_ADMIN':
          // IT admins manage users
          navigate('/admin/accounts');
          break;
        default:
          // Fallback to dashboard when role is unknown
          navigate('/dashboard');
      }
    } catch (err) {
      // Present a friendly error message
      setError(err?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700">Student Management System</h1>
          <p className="mt-2 text-sm text-slate-500">Đăng nhập để tiếp tục quản lý hệ thống sinh viên</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier" className="mb-2 block text-left text-sm font-medium text-slate-700">
              Student ID / Staff Email
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="e.g. SV001 or admin@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-left text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <button
            type="submit"
            disabled={loading}
            className={[
              'w-full rounded-xl px-4 py-3 font-semibold text-white shadow transition',
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700',
            ].join(' ')}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* No registration or sign-up links by design (accounts are pre-provisioned) */}
      </div>
    </div>
  );
}

export default Login;