import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function Attendance() {
  return (
    <FeatureLandingLayout
      title="Điểm danh"
      subtitle="Quản lý điểm danh lớp học phần"
      description="Ghi nhận danh sách có mặt và vắng mặt theo từng buổi học."
      highlights={[
        { badge: 'UC-8', title: 'Attendance', description: 'Điểm danh theo ngày với danh sách có mặt/vắng mặt.' },
      ]}
    />
  );
}

export default Attendance;