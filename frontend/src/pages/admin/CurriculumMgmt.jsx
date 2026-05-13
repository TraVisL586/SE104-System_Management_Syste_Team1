import FeatureLandingLayout from '../../shared/layouts/FeatureLandingLayout';

function CurriculumMgmt() {
  return (
    <FeatureLandingLayout
      title="Chương trình đào tạo"
      subtitle="Quản lý môn học và tín chỉ"
      description="Thiết lập và cập nhật chương trình đào tạo, môn tiên quyết và số tín chỉ yêu cầu."
      highlights={[
        { badge: 'UC-12', title: 'Core Curriculum', description: 'Quản lý môn học, tín chỉ và môn tiên quyết.' },
      ]}
    />
  );
}

export default CurriculumMgmt;