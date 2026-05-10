import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  School,
  Users,
} from 'lucide-react';

const navigationGroups = [
  {
    title: 'Màn hình chính',
    items: [
      {
        label: 'Tổng quan',
        path: '/dashboard',
        icon: Home,
      },
    ],
  },
  {
    title: 'Sinh viên',
    items: [
      {
        label: 'Workspace',
        path: '/student',
        icon: School,
      },
      {
        label: 'Đăng ký học phần',
        path: '/student/registrations',
        icon: GraduationCap,
      },
      {
        label: 'Thời khóa biểu',
        path: '/student/timetable',
        icon: BookOpen,
      },
      {
        label: 'Điểm số',
        path: '/student/grades',
        icon: Users,
      },
      {
        label: 'Học phí',
        path: '/student/tuition',
        icon: CreditCard,
      },
      {
        label: 'Yêu cầu học vụ',
        path: '/student/requests',
        icon: MessageSquare,
      },
    ],
  },
  {
    title: 'Giảng viên',
    items: [
      {
        label: 'Workspace',
        path: '/lecturer',
        icon: School,
      },
      {
        label: 'Nhập điểm',
        path: '/lecturer/grades',
        icon: GraduationCap,
      },
      {
        label: 'Điểm danh',
        path: '/lecturer/attendance',
        icon: Users,
      },
      {
        label: 'Thông báo lớp',
        path: '/lecturer/communications',
        icon: MessageSquare,
      },
      {
        label: 'Danh sách lớp',
        path: '/lecturer/roster',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'Quản trị',
    items: [
      {
        label: 'Academic Admin',
        path: '/admin',
        icon: School,
      },
      {
        label: 'Academic Advisor',
        path: '/advisor',
        icon: Users,
      },
      {
        label: 'Báo cáo thống kê',
        path: '/admin/reports',
        icon: ChevronRight,
      },
    ],
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
      <aside className="fixed left-0 top-0 flex h-screen w-80 flex-col border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100 shadow-2xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            SMS Team 1
          </p>
          <h1 className="mt-2 text-2xl font-bold text-white">
            Student Management System
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Điều hướng theo 4 actor chính để vào đúng khu vực nghiệp vụ.
          </p>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                          isActive
                            ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                            : 'text-slate-300 hover:bg-white/8 hover:text-white',
                        ].join(' ')
                      }
                    >
                      <Icon size={18} />
                      <span className="flex-1">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-red-300/40 hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </aside>

      <main className="ml-80 min-h-screen bg-slate-50 px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;