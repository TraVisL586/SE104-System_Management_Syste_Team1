import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/admin/Dashboard';
import Students from '../pages/admin/Students';
import StudentDetail from '../pages/admin/StudentDetail';
import CourseSections from '../pages/admin/CourseSections';
import Tuition from '../pages/admin/Tuition';
import Registrations from '../pages/student/Registrations';
import Login from '../pages/public/Login';
import NotFound from '../pages/public/NotFound';
import FeaturePlaceholder from '../shared/components/FeaturePlaceholder';
import ProtectedRoute from '../components/ProtectedRoute';
import AcademicAdminWorkspacePage from '../pages/admin/AcademicAdminWorkspacePage';
import AcademicAdvisorWorkspacePage from '../pages/admin/AcademicAdvisorWorkspacePage';
import LecturerWorkspacePage from '../pages/lecturer/LecturerWorkspacePage';
import StudentWorkspacePage from '../pages/student/StudentWorkspacePage';

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/dashboard" replace />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		element: <MainLayout />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/students',
				element: <Students />,
			},
			{
				path: '/students/:studentId',
				element: <StudentDetail />,
			},
			{
				path: '/course-sections',
				element: <CourseSections />,
			},
			{
				path: '/registrations',
				element: <Registrations />,
			},
			{
				path: '/tuition',
				element: <Tuition />,
			},
			{
				path: '/student',
				element: (
					<ProtectedRoute allowedRoles={["STUDENT"]}>
						<StudentWorkspacePage />
					</ProtectedRoute>
				),
			},
			{
				path: '/student/registrations',
				element: (
					<ProtectedRoute allowedRoles={["STUDENT"]}>
						<FeaturePlaceholder
							actor="Student"
							title="Course Registration"
							description="Màn hình đăng ký học phần, có thể mở rộng thành danh sách lớp học phần, trạng thái nợ học phí và cảnh báo lỗi đăng ký."
							useCases={['UC-1']}
						/>
					</ProtectedRoute>
				),
			},
			{
				path: '/student/timetable',
				element: (
					<FeaturePlaceholder
						actor="Student"
						title="Timetable"
						description="Màn hình xem thời khóa biểu theo tuần cho sinh viên."
						useCases={['UC-2']}
					/>
				),
			},
			{
				path: '/student/grades',
				element: (
					<FeaturePlaceholder
						actor="Student"
						title="Grades"
						description="Màn hình xem điểm số và GPA tích lũy, chỉ hiển thị học phần đã phát hành điểm."
						useCases={['UC-3']}
					/>
				),
			},
			{
				path: '/student/tuition',
				element: (
					<FeaturePlaceholder
						actor="Student"
						title="Tuition Payment"
						description="Màn hình thanh toán học phí và hiển thị biên lai sau khi webhook cập nhật trạng thái thành công."
						useCases={['UC-4']}
					/>
				),
			},
			{
				path: '/student/requests',
				element: (
					<FeaturePlaceholder
						actor="Student"
						title="Academic Requests"
						description="Màn hình nộp đơn học vụ như bảo lưu, phúc khảo hoặc vượt tín chỉ."
						useCases={['UC-5']}
					/>
				),
			},
			{
				path: '/student/roster',
				element: (
					<FeaturePlaceholder
						actor="Student"
						title="Class Roster"
						description="Màn hình xem danh sách lớp học phần mà sinh viên đang tham gia."
						useCases={['UC-6']}
					/>
				),
			},
			{
				path: '/lecturer',
				element: (
					<ProtectedRoute allowedRoles={["LECTURER"]}>
						<LecturerWorkspacePage />
					</ProtectedRoute>
				),
			},
			{
				path: '/lecturer/grades',
				element: (
					<FeaturePlaceholder
						actor="Lecturer"
						title="Input Grades"
						description="Màn hình nhập và nộp điểm giữa kỳ/cuối kỳ theo quy trình khóa sửa sau khi phát hành."
						useCases={['UC-7']}
					/>
				),
			},
			{
				path: '/lecturer/attendance',
				element: (
					<FeaturePlaceholder
						actor="Lecturer"
						title="Attendance"
						description="Màn hình điểm danh theo ngày cho lớp học phần."
						useCases={['UC-8']}
					/>
				),
			},
			{
				path: '/lecturer/communications',
				element: (
					<FeaturePlaceholder
						actor="Lecturer"
						title="Academic Communication"
						description="Màn hình gửi thông báo lớp học qua email hoặc thông báo realtime."
						useCases={['UC-9']}
					/>
				),
			},
			{
				path: '/lecturer/roster',
				element: (
					<FeaturePlaceholder
						actor="Lecturer"
						title="Class Roster"
						description="Màn hình xem danh sách sinh viên trong lớp giảng dạy."
						useCases={['UC-6']}
					/>
				),
			},
			{
				path: '/admin',
				element: (
					<ProtectedRoute allowedRoles={["ACADEMIC_ADMIN","IT_ADMIN"]}>
						<AcademicAdminWorkspacePage />
					</ProtectedRoute>
				),
			},
			{
				path: '/admin/dashboard',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Admin Dashboard"
						description="Trang tổng quan cho admin, nơi ghép nhanh các chỉ số lớp học phần, công nợ và tiến độ học vụ."
						useCases={['UC-19']}
					/>
				),
			},
			{
				path: '/admin/course-sections',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Open Course Sections"
						description="Màn hình mở lớp học phần, kèm kiểm tra trùng lịch và sức chứa."
						useCases={['UC-10']}
					/>
				),
			},
			{
				path: '/admin/schedule',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Schedule Timetables"
						description="Màn hình thiết lập khung học kỳ và kiểm tra trùng giờ thi."
						useCases={['UC-11']}
					/>
				),
			},
			{
				path: '/admin/curriculum',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Core Curriculum"
						description="Màn hình quản lý môn học, tín chỉ và môn tiên quyết."
						useCases={['UC-12']}
					/>
				),
			},
			{
				path: '/admin/student-status',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Student Academic Status"
						description="Màn hình cập nhật trạng thái học vụ của sinh viên."
						useCases={['UC-13']}
					/>
				),
			},
			{
				path: '/admin/tuition-status',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Tuition Status"
						description="Màn hình theo dõi và quản lý công nợ học phí."
						useCases={['UC-16']}
					/>
				),
			},
			{
				path: '/admin/accounts',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="User Accounts & Roles"
						description="Màn hình tạo tài khoản, gán vai trò và quản lý phân quyền."
						useCases={['UC-17']}
					/>
				),
			},
			{
				path: '/admin/grade-approvals',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Grade Approvals"
						description="Màn hình phê duyệt mở khóa điểm sau khi giảng viên yêu cầu chỉnh sửa."
						useCases={['UC-18']}
					/>
				),
			},
			{
				path: '/admin/reports',
				element: (
					<FeaturePlaceholder
						actor="Academic Admin"
						title="Reports & Analytics"
						description="Màn hình báo cáo thống kê, biểu đồ và export CSV/PDF."
						useCases={['UC-19']}
					/>
				),
			},
			{
				path: '/advisor',
				element: <AcademicAdvisorWorkspacePage />,
			},
			{
				path: '/advisor/students',
				element: (
					<FeaturePlaceholder
						actor="Academic Advisor"
						title="Review Student Profile"
						description="Màn hình xem danh sách sinh viên được quản lý, GPA và lịch sử học tập."
						useCases={['UC-14']}
					/>
				),
			},
			{
				path: '/advisor/requests',
				element: (
					<FeaturePlaceholder
						actor="Academic Advisor"
						title="Process Academic Requests"
						description="Màn hình duyệt yêu cầu học vụ và gửi kết quả về sinh viên."
						useCases={['UC-15']}
					/>
				),
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default appRouter;