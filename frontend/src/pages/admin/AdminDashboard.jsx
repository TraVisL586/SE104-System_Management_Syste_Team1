import {
  BookOpen,
  CreditCard,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  School,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const statisticCards = [
  {
    title: 'Tổng sinh viên',
    value: '1,248',
    description: 'Sinh viên đang được quản lý',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Lớp học phần',
    value: '86',
    description: 'Lớp học phần đang mở',
    icon: BookOpen,
    color: 'bg-emerald-500',
  },
  {
    title: 'Lượt đăng ký',
    value: '3,425',
    description: 'Đăng ký học phần trong học kỳ',
    icon: GraduationCap,
    color: 'bg-violet-500',
  },
  {
    title: 'Học phí đã thu',
    value: '72%',
    description: 'Tỷ lệ hoàn thành thanh toán',
    icon: CreditCard,
    color: 'bg-amber-500',
  },
];

const actorCards = [
  {
    title: 'Sinh viên',
    description: 'Đăng ký học phần, xem thời khóa biểu, điểm số và học phí.',
    path: '/student',
    accent: 'from-sky-500 to-cyan-400',
    icon: UserRound,
    useCases: 'UC-1 · UC-2 · UC-3 · UC-4',
  },
  {
    title: 'Giảng viên',
    description: 'Nhập điểm, điểm danh, gửi thông báo và xem danh sách lớp.',
    path: '/lecturer',
    accent: 'from-emerald-500 to-teal-400',
    icon: School,
    useCases: 'UC-7 · UC-8 · UC-9',
  },
  {
    title: 'Academic Admin',
    description: 'Mở lớp, xếp lịch, quản lý tài khoản, công nợ và báo cáo.',
    path: '/admin',
    accent: 'from-orange-500 to-amber-400',
    icon: ShieldCheck,
    useCases: 'UC-10 · UC-11 · UC-17 · UC-19',
  },
  {
    title: 'Academic Advisor',
    description: 'Xem hồ sơ sinh viên và xử lý yêu cầu học vụ.',
    path: '/advisor',
    accent: 'from-violet-500 to-fuchsia-400',
    icon: Users,
    useCases: 'UC-14 · UC-15',
  },
];

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-8 py-8 text-white lg:grid-cols-[1.35fr_0.9fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Main screen
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight lg:text-5xl">
              Màn hình chính cho 4 actor của hệ thống học vụ
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
              Đây là điểm vào trung tâm để chuyển nhanh sang khu vực Sinh viên,
              Giảng viên, Academic Admin và Academic Advisor. Mỗi khối đã gắn
              theo use case tương ứng để bạn mở rộng dần theo đúng luồng nghiệp
              vụ.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/student"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Vào khu Sinh viên <ArrowRight size={16} />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Vào khu Quản trị <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {actorCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  to={card.path}
                  className="group rounded-3xl border border-white/10 bg-white/8 p-5 transition hover:-translate-y-1 hover:bg-white/12"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {card.description}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200/80">
                    {card.useCases}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Tổng quan hệ thống
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Các chỉ số mẫu để làm khung dashboard ban đầu.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statisticCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white ${card.color}`}
                >
                  <Icon size={22} />
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Hoạt động gần đây
              </h3>
              <p className="text-sm text-slate-500">
                Các nghiệp vụ thường dùng trong hệ thống.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-4 text-sm text-slate-600">
              Cập nhật hồ sơ sinh viên mới.
            </div>
            <div className="py-4 text-sm text-slate-600">
              Mở lớp học phần cho học kỳ hiện tại.
            </div>
            <div className="py-4 text-sm text-slate-600">
              Ghi nhận đăng ký học phần thành công.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;