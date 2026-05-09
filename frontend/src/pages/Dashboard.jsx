import {
  BookOpen,
  CreditCard,
  GraduationCap,
  TrendingUp,
  Users,
} from 'lucide-react';

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

function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Tổng quan</h2>
        <p className="mt-2 text-slate-500">
          Theo dõi nhanh tình hình sinh viên, lớp học phần, đăng ký và học phí.
        </p>
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

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
    </div>
  );
}

export default Dashboard;