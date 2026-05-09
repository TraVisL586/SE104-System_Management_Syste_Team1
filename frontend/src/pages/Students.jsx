import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

const students = [
  {
    id: 'SV001',
    fullName: 'Nguyễn Văn A',
    faculty: 'Công nghệ thông tin',
    className: 'SE104.N21',
    status: 'Đang học',
  },
  {
    id: 'SV002',
    fullName: 'Trần Thị B',
    faculty: 'Hệ thống thông tin',
    className: 'SE104.N21',
    status: 'Đang học',
  },
  {
    id: 'SV003',
    fullName: 'Lê Minh C',
    faculty: 'Khoa học máy tính',
    className: 'SE104.N22',
    status: 'Tạm nghỉ',
  },
];

function Students() {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Quản lý sinh viên
          </h2>
          <p className="mt-2 text-slate-500">
            Tra cứu, thêm mới và cập nhật thông tin sinh viên.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Thêm sinh viên
        </button>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo mã sinh viên, họ tên, lớp..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Mã SV</th>
              <th className="px-5 py-4 font-semibold">Họ tên</th>
              <th className="px-5 py-4 font-semibold">Khoa</th>
              <th className="px-5 py-4 font-semibold">Lớp</th>
              <th className="px-5 py-4 font-semibold">Trạng thái</th>
              <th className="px-5 py-4 font-semibold">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-900">
                  {student.id}
                </td>
                <td className="px-5 py-4 text-slate-700">
                  {student.fullName}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {student.faculty}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {student.className}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {student.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link
                    to={`/students/${student.id}`}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;