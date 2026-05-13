import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function LecturerTimetable() {
  return (
    <FeatureLandingLayout
      title="Thời khóa biểu"
      subtitle="Lịch giảng dạy theo tuần"
      description="Xem thời khóa biểu các lớp học phần đang phụ trách trong học kỳ."
      highlights={[
        { badge: 'UC-11', title: 'Timetable', description: 'Lịch giảng dạy được xếp bởi Academic Admin.' },
      ]}
    />
  );
}

export default LecturerTimetable;