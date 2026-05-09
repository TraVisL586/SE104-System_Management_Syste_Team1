const tuitionRecords = [
  {
    id: 'HP001',
    studentId: 'SV001',
    studentName: 'Nguyễn Văn A',
    amount: 12500000,
    status: 'Đã thanh toán',
  },
  {
    id: 'HP002',
    studentId: 'SV002',
    studentName: 'Trần Thị B',
    amount: 9800000,
    status: 'Chưa thanh toán',
  },
  {
    id: 'HP003',
    studentId: 'SV003',
    studentName: 'Lê Minh C',
    amount: 11200000,
    status: 'Thanh toán một phần',
  },
];

function Tuition() {
  const formatCurrency = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Quản lý học phí
        </h2>
        <p className="mt-2 text-slate-500">
          Theo dõi học phí và trạng thái thanh toán của sinh viên.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Mã phiếu</th>
              <th className="px-5 py-4 font-semibold">Sinh viên</th>
              <th className="px-5 py-4 font-semibold">Số tiền</th>
              <th className="px-5 py-4 font-semibold">Trạng thái</th>
              <th className="px-5 py-4 font-semibold">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tuitionRecords.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-900">
                  {record.id}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {record.studentId} - {record.studentName}
                </td>
                <td className="px-5 py-4 font-semibold text-slate-900">
                  {formatCurrency(record.amount)}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    {record.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tuition;