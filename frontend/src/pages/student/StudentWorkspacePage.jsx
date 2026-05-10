import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function StudentWorkspacePage() {
  return (
    <FeatureLandingLayout
      title="Sinh viên"
      subtitle="Khu vực học tập và tự phục vụ"
      description="Nơi gom các luồng đăng ký học phần, xem thời khóa biểu, tra cứu điểm, thanh toán học phí và gửi yêu cầu học vụ."
      actions={[
        { label: 'Đăng ký học phần', to: '/student/registrations' },
        { label: 'Xem thời khóa biểu', to: '/student/timetable', variant: 'secondary' },
      ]}
      highlights={[
        { badge: 'UC-1', title: 'Đăng ký học phần', description: 'Luồng chính gồm kiểm tra học phí, tiên quyết, trùng lịch và sức chứa.' },
        { badge: 'UC-2', title: 'Thời khóa biểu', description: 'Xem lịch học theo tuần dựa trên JWT và hồ sơ sinh viên.' },
        { badge: 'UC-3', title: 'Kết quả học tập', description: 'Tra cứu điểm chỉ với các môn đã được publish.' },
      ]}
    />
  );
}

export default StudentWorkspacePage;