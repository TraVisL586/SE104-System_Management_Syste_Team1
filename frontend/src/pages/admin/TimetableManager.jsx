import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function TimetableManager() {
  return (
    <FeatureLandingLayout
      title="Xếp thời khóa biểu"
      subtitle="Thiết lập lịch học và lịch thi"
      description="Xếp thời khóa biểu học kỳ, kiểm tra trùng giờ và phân công phòng học."
      highlights={[
        { badge: 'UC-11', title: 'Schedule Timetables', description: 'Thiết lập khung học kỳ và kiểm tra trùng giờ thi.' },
      ]}
    />
  );
}

export default TimetableManager;