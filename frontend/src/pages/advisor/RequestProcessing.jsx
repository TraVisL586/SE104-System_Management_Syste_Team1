import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function RequestProcessing() {
  return (
    <FeatureLandingLayout
      title="Xử lý yêu cầu học vụ"
      subtitle="Duyệt và phản hồi yêu cầu từ sinh viên"
      description="Xem xét, phê duyệt hoặc từ chối các yêu cầu học vụ và gửi kết quả về sinh viên."
      highlights={[
        { badge: 'UC-15', title: 'Process Requests', description: 'Duyệt yêu cầu học vụ và gửi kết quả tự động.' },
      ]}
    />
  );
}

export default RequestProcessing;