import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function TuitionFees() {
  return (
    <FeatureLandingLayout
      title="Học phí"
      subtitle="Thanh toán và theo dõi công nợ"
      description="Xem tình trạng học phí, thực hiện thanh toán và kiểm tra biên lai."
      highlights={[
        { badge: 'UC-4', title: 'Tuition Payment', description: 'Thanh toán học phí và xem biên lai sau khi webhook cập nhật thành công.' },
      ]}
    />
  );
}

export default TuitionFees;