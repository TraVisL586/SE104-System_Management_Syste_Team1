import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function Communications() {
  return (
    <FeatureLandingLayout
      title="Thông báo lớp"
      subtitle="Gửi thông báo tới sinh viên"
      description="Gửi thông báo tới sinh viên trong lớp qua email hoặc thông báo realtime."
      highlights={[
        { badge: 'UC-9', title: 'Communication', description: 'Gửi thông báo qua email hoặc realtime.' },
      ]}
    />
  );
}

export default Communications;