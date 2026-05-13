import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function AcademicRequests() {
  return (
    <FeatureLandingLayout
      title="Yêu cầu học vụ"
      subtitle="Nộp đơn và theo dõi yêu cầu"
      description="Gửi các yêu cầu học vụ như bảo lưu, phúc khảo hoặc vượt tín chỉ và theo dõi kết quả."
      highlights={[
        { badge: 'UC-5', title: 'Academic Requests', description: 'Nộp đơn bảo lưu, phúc khảo hoặc vượt tín chỉ.' },
      ]}
    />
  );
}

export default AcademicRequests;