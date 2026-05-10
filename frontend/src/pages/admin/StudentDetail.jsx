import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function StudentDetail() {
  const { studentId } = useParams();

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Quay lại danh sách sinh viên
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Hồ sơ sinh viên
          </h2>
          <p className="mt-2 text-slate-500">
            Thông tin chi tiết của sinh viên có mã: {studentId}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <InfoItem label="Mã sinh viên" value={studentId} />
          <InfoItem label="Họ tên" value="Nguyễn Văn A" />
          <InfoItem label="Khoa" value="Công nghệ thông tin" />
          <InfoItem label="Lớp" value="SE104.N21" />
          <InfoItem label="Email" value="student@example.com" />
          <InfoItem label="Trạng thái" value="Đang học" />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default StudentDetail;