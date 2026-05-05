Chi tiết Luồng hoạt động các Use Case (For Developers)

Tài liệu này mô tả từng bước (step-by-step) cách hệ thống xử lý toàn bộ các tính năng chính. Frontend (FE) dựa vào đây để thiết kế UI flow & hiển thị thông báo lỗi. Backend (BE) dựa vào đây để viết logic tuần tự cho các API.

NHÓM TÍNH NĂNG DÀNH CHO SINH VIÊN (STUDENT)

UC-1: Đăng ký học phần (Course Registration)

Actor: Sinh viên | Độ ưu tiên: Cao (Release 1.0)

1. Luồng cơ bản (Happy Path)

Sinh viên truy cập module "Đăng ký học phần".

BE kiểm tra hệ thống kế toán: Xác nhận không nợ học phí.

FE gọi API lấy danh sách Lớp học phần đang mở.

Sinh viên chọn Lớp và bấm "Add".

BE kiểm tra: (1) Môn tiên quyết, (2) Trùng lịch, (3) Giới hạn 24 tín chỉ.

BE request Redis Lock cho Lớp học phần.

BE kiểm tra sức chứa (Capacity) và tiến hành insert enrollments, trừ ghế trống.

BE giải phóng Redis Lock. FE hiển thị thành công.

2. Ngoại lệ (Exceptions)

Lỗi Nợ học phí: FE khóa chức năng đăng ký.

Lỗi Hết chỗ: FE hỏi user có muốn vào danh sách chờ (Waitlist) không.

UC-2: Xem Thời khóa biểu (View Timetable)

Actor: Sinh viên / Giảng viên | Độ ưu tiên: Cao (Release 1.0)

1. Luồng cơ bản

User click menu "Timetable".

FE gọi API kèm JWT Token.

BE extract ID từ Token (BR-11), query lịch học (Sinh viên) hoặc lịch dạy (Giảng viên).

FE render dữ liệu lên Calendar tuần.

2. Ngoại lệ

Lỗi Phân quyền: Nếu truyền sai ID người khác, BE trả 403 Forbidden.

UC-3: Xem Điểm số (Check Grades)

Actor: Sinh viên | Độ ưu tiên: Cao

1. Luồng cơ bản

Sinh viên truy cập "Kết quả học tập".

BE query bảng enrollments kết hợp courses.

BE chỉ lấy ra những môn có grading_status = 'PUBLISHED' (BR-10).

FE hiển thị điểm và tính GPA tích lũy.

UC-4: Đóng Học phí (Pay Tuition Fees)

Actor: Sinh viên | Độ ưu tiên: Trung bình (Release 2.0)

1. Luồng cơ bản

Sinh viên truy cập "Thanh toán". FE hiển thị dư nợ lấy từ Accounting System.

Sinh viên chọn cổng thanh toán (Momo/Stripe) và bấm "Thanh toán".

BE khởi tạo phiên giao dịch (Mã hóa 256-bit theo BR-15) và trả về URL thanh toán.

Hệ thống thanh toán gọi Webhook trả kết quả về BE.

BE cập nhật trạng thái nợ thành PAID. FE hiển thị biên lai.

UC-5: Gửi Yêu cầu Học vụ (Submit Academic Request)

Actor: Sinh viên | Độ ưu tiên: Thấp

1. Luồng cơ bản

Sinh viên chọn "Nộp đơn" (Bảo lưu, Phúc khảo, Vượt tín chỉ).

Sinh viên điền form và đính kèm minh chứng.

BE lưu vào bảng academic_requests với trạng thái PENDING. FE thông báo thành công.

UC-6: Xem Danh sách Lớp (View Class Roster)

Actor: Sinh viên / Giảng viên | Độ ưu tiên: Trung bình

1. Luồng cơ bản

User chọn một lớp học phần đang tham gia/giảng dạy.

BE trả về danh sách sinh viên ENROLLED trong lớp đó.

NHÓM TÍNH NĂNG DÀNH CHO GIẢNG VIÊN (LECTURER)

UC-7: Nhập điểm Giữa kỳ/Cuối kỳ (Input Grades)

Actor: Giảng viên | Độ ưu tiên: Cao (Release 1.0)

1. Luồng cơ bản

Giảng viên truy cập lớp học phần mình phụ trách.

BE kiểm tra thời hạn nhập điểm (7 ngày sau thi).

Giảng viên nhập điểm (0.0 -> 10.0, làm tròn 1 chữ số thập phân - BR-7).

Giảng viên bấm "Submit Official Grades".

BE tính điểm tổng (10-30-60 theo BR-8), đổi status thành PUBLISHED và khóa sửa đổi (BR-9).

UC-8: Điểm danh (Take Attendance)

Actor: Giảng viên | Độ ưu tiên: Thấp

1. Luồng cơ bản

Giảng viên mở danh sách lớp, chọn "Điểm danh ngày X".

FE hiển thị list checkbox (Có mặt/Vắng mặt).

BE lưu trạng thái điểm danh vào bảng attendances.

UC-9: Gửi Thông báo Lớp học (Send Academic Communication)

Actor: Giảng viên | Độ ưu tiên: Trung bình

1. Luồng cơ bản

Giảng viên soạn tin nhắn/thông báo cho một lớp.

BE push notification (WebSocket) hoặc gửi Email hàng loạt tới các Sinh viên ENROLLED trong lớp.

NHÓM TÍNH NĂNG DÀNH CHO QUẢN TRỊ VIÊN (ACADEMIC ADMIN)

UC-10: Mở Lớp Học Phần (Open Course Sections)

Actor: Academic Admin | Độ ưu tiên: Cao (Release 1.0)

1. Luồng cơ bản

Admin chọn "Mở Lớp Học Phần".

FE hiển thị Form tạo lớp (Mã lớp, Giảng viên, Capacity, Lịch, Phòng).

BE check trùng lịch giảng viên và trùng phòng học.

BE lưu DB và chuẩn bị khóa Redis (BR-3).

2. Ngoại lệ

FE bắt lỗi và hiển thị "Giảng viên trùng lịch" hoặc "Phòng đã có lớp".

UC-11: Sắp xếp Lịch học (Schedule Timetables)

Actor: Academic Admin | Độ ưu tiên: Cao

1. Luồng cơ bản

Admin thiết lập Khung thời gian cho học kỳ (Ngày bắt đầu, Ngày kết thúc, Tuần thi).

BE tự động validate không để các môn thi bị trùng giờ nhau đối với các môn cùng khối ngành.

UC-12: Quản lý Chương trình Đào tạo (Manage Core Curriculum)

Actor: Academic Admin | Độ ưu tiên: Cao

1. Luồng cơ bản

Admin tạo mới hoặc cập nhật thông tin Môn học (Courses).

Admin thiết lập số Tín chỉ, Môn tiên quyết, Khoa quản lý.

BE lưu vào danh mục cốt lõi (Core Catalog) để dùng cho Validate Đăng ký môn (UC-1).

UC-13: Cập nhật Trạng thái Học vụ (Update Student Academic Status)

Actor: Academic Admin | Độ ưu tiên: Trung bình

1. Luồng cơ bản

Admin chạy batch job hoặc sửa tay trạng thái sinh viên (STUDYING, ON_LEAVE, GRADUATED).

BE cập nhật profile. Nếu là GRADUATED, BE tự động khóa quyền đăng ký môn mới.

NHÓM TÍNH NĂNG DÀNH CHO CỐ VẤN HỌC TẬP (ACADEMIC ADVISOR)

UC-14: Xem Hồ sơ Sinh viên (Review Student Profile)

Actor: Academic Advisor | Độ ưu tiên: Trung bình

1. Luồng cơ bản

Cố vấn truy cập danh sách sinh viên mình quản lý.

FE gọi API lấy thống kê (GPA, Số tín chỉ đã đạt, Các môn đang rớt).

Cố vấn click vào chi tiết để xem lịch sử học tập.

UC-15: Xử lý Yêu cầu Học vụ (Process Academic Request)

Actor: Academic Advisor | Độ ưu tiên: Thấp

1. Luồng cơ bản

Cố vấn nhận thông báo có đơn (từ UC-5).

Cố vấn đọc minh chứng, chọn APPROVED hoặc REJECTED.

BE lưu trạng thái và tự động gửi Email báo kết quả cho Sinh viên.

NHÓM TÍNH NĂNG BỔ SUNG (HOÀN THIỆN HỆ THỐNG)

UC-16: Theo dõi & Quản lý Công nợ (Manage Tuition Status)

Actor: Academic Admin | Độ ưu tiên: Trung bình

1. Luồng cơ bản

Admin truy cập module "Quản lý Công nợ".

FE hiển thị bộ lọc (Theo khóa, khoa, trạng thái nợ).

BE query CSDL kết hợp dữ liệu từ Accounting System để trả về danh sách sinh viên.

Admin có thể bấm nút "Gửi nhắc nhở". BE sẽ trigger hệ thống gửi email cảnh báo tự động đến các sinh viên có trạng thái OWED.

UC-17: Quản lý Tài khoản & Phân quyền (Manage User Accounts)

Actor: Academic Admin | Độ ưu tiên: Cao (Yêu cầu bởi BR-12)

1. Luồng cơ bản

Admin truy cập "Quản lý Hệ thống" -> "Tạo tài khoản".

Admin nhập ID (Mã SV/Mã GV), Email và chọn Role (STUDENT, LECTURER).

BE validate: Email và ID không được trùng lặp (BR-13).

BE sinh mật khẩu mặc định đảm bảo chuẩn bảo mật (BR-14) và lưu vào bảng users.

BE tạo profile trống tương ứng vào bảng students hoặc lecturers.

UC-18: Phê duyệt Mở khóa Điểm (Approve Grade Modifications)

Actor: Academic Admin | Độ ưu tiên: Trung bình (Yêu cầu bởi BR-9)

1. Luồng cơ bản

Giảng viên gửi yêu cầu sửa điểm do nhập sai (sau khi điểm đã bị khóa thành PUBLISHED).

Admin truy cập module "Yêu cầu Mở khóa Điểm".

Admin xem xét lý do và bấm "Approve".

BE chuyển trạng thái điểm của lớp đó từ PUBLISHED về lại DRAFT.

BE ghi lại hành động này vào bảng Audit Log (Nhật ký hệ thống) để đảm bảo tính minh bạch.

UC-19: Xem Báo cáo & Thống kê (View System Reports)

Actor: Academic Admin | Độ ưu tiên: Cao (Yêu cầu bởi phần 4.3 trong SRS)

1. Luồng cơ bản

Admin chọn menu "Báo cáo thống kê".

Admin chọn loại báo cáo (VD: Báo cáo tỷ lệ lấp đầy lớp học, Báo cáo tiến độ nhập điểm).

BE chạy các câu lệnh query tổng hợp (Aggregation) dữ liệu.

FE hiển thị dữ liệu dưới dạng Biểu đồ (Chart) hoặc Bảng lưới (Data Grid).

Admin bấm "Export". FE/BE tạo file PDF hoặc CSV cho Admin tải về.