import { Plus } from 'lucide-react';

const courseSections = [
  {
    id: 'SE104.N21',
    subject: 'Nhập môn Công nghệ phần mềm',
    lecturer: 'Giảng viên A',
    capacity: 80,
    registered: 72,
    status: 'Đang mở',
  },
  {
    id: 'CS101.N11',
    subject: 'Cơ sở lập trình',
    lecturer: 'Giảng viên B',
    capacity: 100,
    registered: 100,
    status: 'Đã đầy',
  },
  {
    id: 'DB202.N31',
    subject: 'Cơ sở dữ liệu',
    lecturer: 'Giảng viên C',
    capacity: 90,
    registered: 65,
    status: 'Đang mở',
  },
];

function CourseSections() {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Quản lý lớp học phần
          </h2>
          <p className="mt-2 text-slate-500">
            Theo dõi trạng thái mở lớp, sĩ số và giảng viên phụ trách.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Mở lớp học phần
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {courseSections.map((section) => (
          <div
            key={section.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {section.subject}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{section.id}</p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {section.status}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">Giảng viên:</span>{' '}
                {section.lecturer}
              </p>
              <p>
                <span className="font-medium text-slate-800">Sĩ số:</span>{' '}
                {section.registered}/{section.capacity}
              </p>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${(section.registered / section.capacity) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseSections;