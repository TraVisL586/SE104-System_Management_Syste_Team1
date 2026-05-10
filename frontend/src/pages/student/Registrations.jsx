const registrations = [
  {
    id: 'DK001',
    studentId: 'SV001',
    studentName: 'Nguyễn Văn A',
    courseSection: 'SE104.N21',
    status: 'Thành công',
  },
  {
    id: 'DK002',
    studentId: 'SV002',
    studentName: 'Trần Thị B',
    courseSection: 'DB202.N31',
    status: 'Thành công',
  },
  {
    id: 'DK003',
    studentId: 'SV003',
    studentName: 'Lê Minh C',
    courseSection: 'CS101.N11',
    status: 'Chờ xử lý',
  },
];

function Registrations() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Đăng ký học phần
        </h2>
        <p className="mt-2 text-slate-500">
          Quản lý nghiệp vụ đăng ký lớp học phần của sinh viên.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Mã sinh viên"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Mã lớp học phần"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Đăng ký
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Mã đăng ký</th>
                <th className="px-5 py-4 font-semibold">Sinh viên</th>
                <th className="px-5 py-4 font-semibold">Lớp học phần</th>
                <th className="px-5 py-4 font-semibold">Trạng thái</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {registrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {registration.id}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {registration.studentId} - {registration.studentName}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {registration.courseSection}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {registration.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Registrations;