import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function Grades() {
  return (
    <FeatureLandingLayout
      title="Kết quả học tập"
      subtitle="Điểm số và GPA tích lũy"
      description="Tra cứu điểm các học phần đã được giảng viên phát hành."
      highlights={[
        { badge: 'UC-3', title: 'View Grades', description: 'Chỉ hiển thị học phần đã được publish điểm.' },
      ]}
    />
  );
}

export default Grades;