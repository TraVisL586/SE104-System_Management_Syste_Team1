import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function ClassRoster() {
  return (
    <FeatureLandingLayout
      title="Danh sách lớp"
      subtitle="Danh sách sinh viên trong lớp giảng dạy"
      description="Xem toàn bộ sinh viên đã đăng ký lớp học phần do giảng viên phụ trách."
      highlights={[
        { badge: 'UC-6', title: 'Class Roster', description: 'Danh sách sinh viên trong lớp học phần.' },
      ]}
    />
  );
}

export default ClassRoster;