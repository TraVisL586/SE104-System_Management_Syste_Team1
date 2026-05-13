import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function LecturerDashboard() {
  return (
    <FeatureLandingLayout
      title="Dashboard Giảng viên"
      subtitle="Tổng quan hoạt động giảng dạy"
      description="Xem nhanh lịch dạy, tiến độ nhập điểm và các thông báo học vụ."
      highlights={[
        { badge: 'UC-7', title: 'Grades', description: 'Trạng thái nhập điểm các lớp đang phụ trách.' },
        { badge: 'UC-8', title: 'Attendance', description: 'Thống kê điểm danh tuần hiện tại.' },
      ]}
    />
  );
}

export default LecturerDashboard;