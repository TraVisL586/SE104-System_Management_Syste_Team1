# Frontend <-> Backend Linking Guide

Use this checklist to connect any frontend screen to a backend endpoint without changing backend code.

## 1) Prereqs
- Set the API base URL in `frontend/.env`:
  - `VITE_API_BASE_URL=http://localhost:8080`
- Disable mock auth when using real backend:
  - `VITE_USE_MOCK=false`
- Login stores:
  - `sms_access_token` in localStorage (used by `apiClient`)
  - `sms_user` in localStorage (used by `RoleContext`)

## 2) Find the backend endpoint
- Locate controller mapping and request/response DTOs.
- Note HTTP method, path, query params, and response fields.

Example format:
- `GET /api/student/course-sections/open?semesterId=2&keyword=...`
- Response fields: `id`, `courseCode`, `courseName`, `credits`, `lecturerName`, `capacity`, `enrolledCount`, `availableSeats`, ...

## 3) Create a service wrapper
Add a service module in `frontend/src/services/` so pages do not call `apiClient` directly.

Example template:
```js
import apiClient from './apiClient';

export async function getItems(params) {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/api/path${query ? `?${query}` : ''}`);
}

export async function createItem(payload) {
  return apiClient.post('/api/path', payload);
}

export async function deleteItem(id) {
  return apiClient.del(`/api/path/${id}`);
}
```

## 4) Map DTO -> UI fields
- Create a clear mapping from response fields to UI usage.
- Handle missing fields by showing a placeholder or hiding UI blocks.
- Avoid inventing data that is not in the response.

## 5) Wire the page
- Load data in `useEffect`.
- Add loading, error, and empty states.
- Add search or filters (debounce if calling backend).
- Keep validation logic on the client for fast feedback.

## 6) Submit flows
- Decide request strategy (sequential, parallel, stop on error).
- Show success/error toasts and refresh data after submission.

## 7) Course Registration example (current implementation)
Backend endpoints:
- `GET /api/student/course-sections/open?semesterId=2&keyword=`
- `GET /api/student/registrations`
- `POST /api/student/registrations` with body `{ courseSectionId }`

Frontend wiring:
- Service: `frontend/src/services/courseRegistrationService.js`
- Page: `frontend/src/pages/student/Registrations.jsx`
- Credit limit: `MAX_TC = 24`
- Semester: `CURRENT_SEMESTER_ID = 2` (change as needed)

## 8) Quick verification
1. Login with a real backend account and confirm `sms_access_token` is set.
2. Open the page and confirm data loads.
3. Submit an action and confirm UI refreshes from backend data.

---

## 9) Backend Endpoints Overview & Priority Linking

### 🔴 **P0 - Critical (Must do first)**

#### 1. **Authentication**
- `POST /api/auth/login` (No auth needed)
  - Request: `{ username, password }`
  - Response: `{ token, refreshToken, ... }`
  - **FE Status**: ✅ Already implemented
  - **Current File**: `frontend/src/services/AuthService.js`

---

### 🟠 **P1 - High Priority (Foundation)**

#### 2. **Student Profile & Settings**
- `GET /api/student/me`
  - Response: Student info + academic status
  - **Use**: Display dashboard, navbar, student profile page
  
- `PUT /api/student/change-password`
  - Request: `{ currentPassword, newPassword }`
  - Response: Success message

**Pages to implement**:
- Student Dashboard (`/pages/student/Dashboard.jsx`)
- Student Profile Settings (`/pages/student/ProfileSettings.jsx`)

#### 3. **Course Registration** (Already partially done)
- `GET /api/student/course-sections/open?semesterId=X&keyword=`
  - Response: List of available course sections
  - **FE Status**: ✅ Already implemented
  
- `POST /api/student/registrations`
  - Request: `{ courseSectionId, semesterId }`
  - **FE Status**: ✅ Already implemented
  
- `GET /api/student/registrations`
  - Response: Student's current enrollments
  - **FE Status**: ✅ Already implemented
  
- `DELETE /api/student/registrations/{enrollmentId}`
  - Cancel course registration
  - **FE Status**: ✅ Already implemented

#### 4. **Timetable & Class Roster**
- `GET /api/student/timetable`
  - Response: Weekly schedule with room, time, lecturer
  - **Use**: Display in Dashboard and dedicated Timetable page
  
- `GET /api/student/course-sections/{sectionId}/roster`
  - Response: Class roster with students list

**Pages to implement**:
- Student Timetable View (`/pages/student/TimetableView.jsx`)

#### 5. **Grades**
- `GET /api/student/grades`
  - Response: All published grades for all courses
  - **Use**: Show in a Grades page with GPA calculation
  
- `GET /api/student/grades/{enrollmentId}`
  - Response: Single grade details

**Pages to implement**:
- Student Grades Page (`/pages/student/GradesPage.jsx`)

---

### 🟡 **P2 - Medium Priority (Core Business Logic)**

#### 6. **Tuition & Payments**
- `GET /api/student/tuition-records`
  - Response: List of tuition records per semester
  
- `GET /api/student/tuition-records/semesters/{semesterId}`
  - Response: Single tuition record details
  
- `POST /api/student/payments`
  - Request: `{ tuitionRecordId, amount, paymentProvider }`
  - Response: Payment record with ID
  
- `GET /api/student/payments`
  - Response: Payment history
  
- `GET /api/student/payments/{paymentId}`
  - Response: Single payment details
  
- `PATCH /api/student/payments/{paymentId}/cancel`
  - Cancel pending payment
  
- `POST /api/student/payments/{paymentId}/mock-confirm` (Dev only)
  - Mock payment confirmation

**Pages to implement**:
- Student Tuition Dashboard (`/pages/student/TuitionDashboard.jsx`)
- Payment History (`/pages/student/PaymentHistory.jsx`)

#### 7. **Academic Advising**
- `POST /api/student/academic-requests`
  - Request: `{ requestType, reason, ... }`
  - Response: Academic request record
  
- `GET /api/student/academic-requests`
  - Response: Student's pending/approved academic requests

**Pages to implement**:
- Student Academic Requests (`/pages/student/AcademicRequests.jsx`)

#### 8. **Attendance & Announcements**
- `GET /api/student/attendance?courseSectionId=X`
  - Response: Attendance records (present/absent dates)
  
- `GET /api/student/notifications?isRead=false`
  - Response: Class announcements and notifications

**Pages to implement**:
- Student Attendance View (`/pages/student/AttendanceView.jsx`)
- Notifications Center (`/pages/student/Notifications.jsx`)

---

### 🟢 **P3 - Admin Panel (Lower Priority)**

#### 9. **Admin - Student Management**
- `GET /api/admin/students`
  - Response: All students list
  
- `POST /api/admin/students`
  - Request: `{ firstName, lastName, email, studentCode, ... }`
  
- `GET /api/admin/students/{id}`
  - Response: Single student details
  
- `PUT /api/admin/students/{id}`
  - Update student info
  
- `PATCH /api/admin/students/{id}/academic-status`
  - Update academic status (active/suspended/graduated)
  
- `DELETE /api/admin/students/{id}`

**Pages to implement**:
- Admin Student List (`/pages/admin/StudentManagement.jsx`)
- Student Details (`/pages/admin/StudentDetails.jsx`)

#### 10. **Admin - Account Management**
- `GET /api/admin/accounts`
  - Response: All accounts
  
- `POST /api/admin/accounts`
  - Create new account (student/lecturer/advisor)
  
- `GET /api/admin/accounts/{id}`
  
- `PATCH /api/admin/accounts/{id}/status`
  - Activate/deactivate account
  
- `PATCH /api/admin/accounts/{id}/password`
  - Reset account password

**Pages to implement**:
- Admin Account Management (`/pages/admin/AccountManagement.jsx`)

#### 11. **Admin - Academic Catalog**
- `GET /api/admin/catalog/departments`
- `POST /api/admin/catalog/departments`
- `PUT /api/admin/catalog/departments/{id}`
- `DELETE /api/admin/catalog/departments/{id}`

- `GET /api/admin/catalog/programs`
- `POST /api/admin/catalog/programs`
- `PUT /api/admin/catalog/programs/{id}`
- `DELETE /api/admin/catalog/programs/{id}`

- `GET /api/admin/catalog/courses`
- `POST /api/admin/catalog/courses`
- `PUT /api/admin/catalog/courses/{id}`
- `DELETE /api/admin/catalog/courses/{id}`
- `POST /api/admin/catalog/courses/{courseId}/prerequisites`

**Pages to implement**:
- Academic Catalog Management (`/pages/admin/AcademicCatalogMgmt.jsx`)

#### 12. **Admin - Semester & Scheduling**
- `GET /api/admin/scheduling/semesters`
- `POST /api/admin/scheduling/semesters`
- `PUT /api/admin/scheduling/semesters/{id}`
- `DELETE /api/admin/scheduling/semesters/{id}`

- `GET /api/admin/scheduling/rooms`
- `POST /api/admin/scheduling/rooms`

- `GET /api/admin/scheduling/course-sections`
- `POST /api/admin/scheduling/course-sections`
- `PUT /api/admin/scheduling/course-sections/{id}`
- `GET /api/admin/scheduling/course-sections/{sectionId}/schedules`
- `POST /api/admin/scheduling/course-sections/{sectionId}/schedules`

**Pages to implement**:
- Semester Management (`/pages/admin/SemesterMgmt.jsx`)
- Room Management (`/pages/admin/RoomMgmt.jsx`)
- Course Section Scheduling (`/pages/admin/CourseSectionScheduling.jsx`)

#### 13. **Admin - Grade Management**
- `GET /api/admin/grade-unlock-requests`
- `PATCH /api/admin/grade-unlock-requests/{requestId}/decision`
- `GET /api/admin/audit-logs`

#### 14. **Admin - Enrollment Management**
- `GET /api/admin/registrations`
  - All enrollments
  
- `GET /api/admin/registrations/sections/{sectionId}`
  - Enrollments for a specific course section
  
- `GET /api/admin/registrations/students/{studentId}`
  - Enrollments for a specific student

#### 15. **Admin - Payment & Tuition Management**
- `GET /api/admin/payments`
- `GET /api/admin/payments/{paymentId}`
- `GET /api/admin/payments/students/{studentId}`

- `GET /api/admin/tuition-records`
- `POST /api/admin/tuition-records`
- `PUT /api/admin/tuition-records/{id}`
- `GET /api/admin/tuition-records/students/{studentId}`
- `GET /api/admin/tuition-records/semesters/{semesterId}`
- `PATCH /api/admin/tuition-records/{id}/payments`

#### 16. **Admin - Reports**
- `GET /api/admin/reports/class-fill-rates?semesterId=X`
- `GET /api/admin/reports/grade-progress?semesterId=X`
- `GET /api/admin/reports/student-status-summary`
- `GET /api/admin/reports/tuition-summary?semesterId=X`
- Export endpoints: `/export` versions return CSV

#### 17. **Lecturer Functions**
- `GET /api/lecturer/timetable` - Lecturer's schedule
- `GET /api/lecturer/course-sections/{sectionId}/grades` - View class grades
- `PUT /api/lecturer/enrollments/{enrollmentId}/grade` - Input grade
- `PATCH /api/lecturer/enrollments/{enrollmentId}/grade/publish` - Publish grade
- `GET /api/lecturer/course-sections/{sectionId}/attendance` - View attendance
- `PUT /api/lecturer/course-sections/{sectionId}/attendance` - Record attendance
- `POST /api/lecturer/course-sections/{sectionId}/announcements` - Create announcement

**Pages to implement**:
- Lecturer Dashboard (`/pages/lecturer/Dashboard.jsx`)
- Grade Input (`/pages/lecturer/GradeInput.jsx`)
- Attendance (`/pages/lecturer/Attendance.jsx`)

#### 18. **Advisor Functions**
- `GET /api/advisor/students` - My advised students
- `GET /api/advisor/students/{studentId}/profile` - Student profile
- `GET /api/advisor/academic-requests?status=PENDING` - Pending requests
- `PATCH /api/advisor/academic-requests/{requestId}/decision` - Approve/reject request

**Pages to implement**:
- Advisor Dashboard (`/pages/advisor/Dashboard.jsx`)
- Student List (`/pages/advisor/MyStudents.jsx`)
- Academic Requests (`/pages/advisor/AcademicRequests.jsx`)

---

## 10) Implementation Roadmap

### **Week 1: Student Core (P0 + P1)**
- ✅ Authentication (already done)
- [ ] Student Dashboard with profile
- [ ] Course Registration (already done, verify it works)
- [ ] Timetable view
- [ ] Grades view

### **Week 2: Student Transactions (P2)**
- [ ] Tuition & Payments
- [ ] Academic Requests
- [ ] Attendance & Notifications

### **Week 3: Admin Core (P3)**
- [ ] Student Management
- [ ] Account Management
- [ ] Academic Catalog
- [ ] Semester & Scheduling

### **Week 4: Advanced Features**
- [ ] Lecturer functions
- [ ] Advisor functions
- [ ] Reports
- [ ] Attendance for lecturers

---

## 11) DTOs & Response Structures
Each endpoint maps to specific DTOs in backend. When creating a service, inspect the response structure from backend logs or Swagger documentation to ensure UI maps fields correctly.

Example (from CourseRegistrationController):
```
GET /api/student/course-sections/open response:
{
  "id": 1,
  "courseCode": "CS101",
  "courseName": "Intro to Programming",
  "credits": 3,
  "lecturerName": "Dr. John",
  "capacity": 30,
  "enrolledCount": 25,
  "availableSeats": 5,
  "schedules": [
    {
      "dayOfWeek": "MONDAY",
      "startTime": "08:00",
      "endTime": "09:30",
      "room": {
        "id": 1,
        "roomCode": "A101",
        "capacity": 40
      }
    }
  ]
}
```

Map these to UI elements:
- `courseCode + courseName` → Display as course header
- `credits` → Show credit units
- `enrolledCount / capacity` → Show progress bar
- `schedules` → Show in table format
- `lecturerName` → Show instructor info
