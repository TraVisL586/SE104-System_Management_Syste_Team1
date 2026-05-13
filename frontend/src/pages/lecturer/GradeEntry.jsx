import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function GradeEntry() {
  return (
    <FeatureLandingLayout
      title="Nhập điểm"
      subtitle="Nhập điểm giữa kỳ và cuối kỳ"
      description="Nhập và nộp điểm theo quy trình khóa sửa sau khi phát hành."
      highlights={[
        { badge: 'UC-7', title: 'Input Grades', description: 'Nhập điểm giữa kỳ/cuối kỳ và chốt điểm theo quy tắc khóa sửa.' },
      ]}
    />
  );
}

export default GradeEntry;