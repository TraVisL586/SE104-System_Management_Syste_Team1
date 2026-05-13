import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function StudentTimetable() {
  return (
    <FeatureLandingLayout
      title="Thời khóa biểu"
      subtitle="Lịch học theo tuần"
      description="Xem thời khóa biểu các học phần đã đăng ký trong học kỳ hiện tại."
      highlights={[
        { badge: 'UC-2', title: 'Timetable', description: 'Xem lịch học theo tuần dựa trên các học phần đã đăng ký.' },
      ]}
    />
  );
}

export default StudentTimetable;