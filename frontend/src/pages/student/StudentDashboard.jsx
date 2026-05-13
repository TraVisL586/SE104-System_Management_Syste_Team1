import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function StudentDashboard() {
  return (
    <FeatureLandingLayout
      title="Dashboard Sinh viên"
      subtitle="Tổng quan học tập"
      description="Xem nhanh lịch học, điểm số, trạng thái học phí và các thông báo học vụ."
      highlights={[
        { badge: 'UC-1', title: 'Registrations', description: 'Trạng thái đăng ký học phần học kỳ hiện tại.' },
        { badge: 'UC-3', title: 'Grades', description: 'Điểm số các học phần đã công bố.' },
        { badge: 'UC-4', title: 'Tuition', description: 'Tình trạng thanh toán học phí.' },
      ]}
    />
  );
}

export default StudentDashboard;