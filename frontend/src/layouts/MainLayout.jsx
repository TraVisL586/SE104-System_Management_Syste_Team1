import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  Home,
  LogOut,
  Users,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Tổng quan',
    path: '/dashboard',
    icon: Home,
  },
  {
    label: 'Sinh viên',
    path: '/students',
    icon: Users,
  },
  {
    label: 'Lớp học phần',
    path: '/course-sections',
    icon: BookOpen,
  },
  {
    label: 'Đăng ký học phần',
    path: '/registrations',
    icon: GraduationCap,
  },
  {
    label: 'Học phí',
    path: '/tuition',
    icon: CreditCard,
  },
];

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sms_access_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 shadow-sm">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-blue-700">SMS Team 1</h1>
          <p className="mt-1 text-sm text-slate-500">
            Student Management System
          </p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-blue-700',
                  ].join(' ')
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="absolute bottom-6 left-5 right-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </aside>

      <main className="ml-72 min-h-screen px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;