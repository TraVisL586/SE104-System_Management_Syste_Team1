# AI Agent Sprint Plans
## FE-BE Linking Implementation

Designed for AI Agent execution: **Each sprint is 1 complete handoff**

---

## SPRINT 1: Student Auth & Profile (3 tasks)
**Duration**: 1-2 days  
**Handoff**: Complete deliverable with manual tests  
**Dependencies**: None (Auth already done)

### Task 1.1: Student Dashboard (GET /api/student/me)
**Create**: `frontend/src/services/studentService.js`
```js
export async function getMyProfile() {
  return apiClient.get('/api/student/me');
}
```

**Create**: `frontend/src/pages/student/Dashboard.jsx`
- Component fetches profile in useEffect
- Display: Name, email, studentCode, program, status
- Loading state while fetching
- Error toast on failure

**Manual Test**:
1. Login as student
2. Navigate to dashboard
3. Verify name/email/code displays
4. Check Network: GET /api/student/me returns 200
5. Refresh → data persists

**Acceptance**:
- ✅ Profile displays correctly
- ✅ No console errors
- ✅ Loading indicator shown
- ✅ Error toast on 401/500

---

### Task 1.2: Change Password (PUT /api/student/change-password)
**Add to**: `studentService.js`
```js
export async function changePassword(currentPassword, newPassword) {
  return apiClient.put('/api/student/change-password', {
    currentPassword,
    newPassword
  });
}
```

**Add to**: `Dashboard.jsx` (button) or `ProfileSettings.jsx` (new component)
- Form: Current password, new password, confirm password
- Validation: Non-empty, match, current ≠ new
- Submit: Call service + success toast
- Error: Show error message

**Manual Test**:
1. Click "Change Password"
2. Try wrong current password → form error
3. Enter correct current password
4. New password ≠ current, passwords match
5. Submit → success toast
6. Login again with new password in incognito tab
7. Old password fails to login

**Acceptance**:
- ✅ Form validates correctly
- ✅ New password works
- ✅ Old password doesn't work
- ✅ Error toast on failure
- ✅ No console errors

---

### Task 1.3: Verify Course Registration
**Review**: `frontend/src/services/courseRegistrationService.js`
- Check 4 functions exist: getOpenSections, getMyRegistrations, register, cancelRegistration
- Verify API paths match backend spec
- Add error handling: show toast on error, not just throw

**Review**: `frontend/src/pages/student/Registrations.jsx` (or create)
- Load available courses on mount
- Load my registrations on mount  
- Register/cancel buttons work
- Loading & error states

**Manual Test**:
1. Go to course registration page
2. See list of available courses (show capacity, enrolled)
3. Click "Register" → success toast + appears in "My Courses"
4. Click "Cancel" → removed from "My Courses"
5. Refresh → persists
6. Check Network: All paths correct, no 401 errors

**Acceptance**:
- ✅ Available courses load
- ✅ My registrations load
- ✅ Register/cancel works
- ✅ Data persists after refresh
- ✅ No duplicate registrations
- ✅ No 401 errors (auth token working)

---

## SPRINT 2: Student Schedule & Grades (3 tasks)
**Duration**: 1-2 days  
**Dependencies**: Sprint 1 (student service exists)

### Task 2.1: Timetable View (GET /api/student/timetable)
**Create**: `frontend/src/services/timetableService.js`
```js
export async function getMyTimetable() {
  return apiClient.get('/api/student/timetable');
}
```

**Create**: `frontend/src/pages/student/TimetableView.jsx`
- Fetch timetable in useEffect
- Display: Weekly grid (Mon-Fri, time slots)
- For each entry: Course name, room, lecturer, time
- Loading & error states

**Example Response**:
```json
[
  {
    "courseName": "CS101",
    "courseCode": "Intro to Programming",
    "dayOfWeek": "MONDAY",
    "startTime": "08:00",
    "endTime": "09:30",
    "room": "A101",
    "lecturer": "Dr. John"
  }
]
```

**Manual Test**:
1. Go to timetable page
2. See schedule with days/times
3. No time conflicts visible
4. Room and lecturer info shown
5. Refresh → data persists

**Acceptance**:
- ✅ Timetable displays all courses
- ✅ Time slots formatted correctly
- ✅ No overlapping classes shown incorrectly
- ✅ Room/lecturer info shown
- ✅ Loading state shown
- ✅ Error toast on failure

---

### Task 2.2: Grades View (GET /api/student/grades)
**Create**: Add to `studentService.js`
```js
export async function getMyGrades() {
  return apiClient.get('/api/student/grades');
}
```

**Create**: `frontend/src/pages/student/GradesPage.jsx`
- Fetch grades in useEffect
- Display: Table (Course, Grade, Status, Semester)
- Calculate: GPA from grades
- Show: Only published grades
- Loading & error states

**Example Response**:
```json
[
  {
    "enrollmentId": 1,
    "courseCode": "CS101",
    "courseName": "Intro to Programming",
    "grade": 8.5,
    "letterGrade": "A",
    "gradeStatus": "PUBLISHED",
    "semester": 2
  }
]
```

**Manual Test**:
1. Go to grades page
2. See all published grades in table
3. GPA calculated correctly (sum of grades / count)
4. Status shows "PUBLISHED"
5. Unpublished grades NOT shown
6. Refresh → data persists

**Acceptance**:
- ✅ All published grades show
- ✅ GPA calculated correctly
- ✅ Grade status correct
- ✅ Unpublished grades hidden
- ✅ No console errors
- ✅ Error toast on failure

---

### Task 2.3: Student Attendance View (GET /api/student/attendance)
**Create**: Add to `studentService.js`
```js
export async function getMyAttendance(courseSectionId) {
  const query = courseSectionId ? `?courseSectionId=${courseSectionId}` : '';
  return apiClient.get(`/api/student/attendance${query}`);
}
```

**Create**: `frontend/src/pages/student/AttendanceView.jsx`
- Fetch attendance in useEffect
- Display: Table (Course, Date, Status: Present/Absent)
- Filter: Optional course filter
- Calculate: Attendance rate per course
- Loading & error states

**Example Response**:
```json
[
  {
    "courseSectionId": 1,
    "courseCode": "CS101",
    "date": "2026-05-16",
    "status": "PRESENT"
  },
  {
    "courseSectionId": 1,
    "courseCode": "CS101",
    "date": "2026-05-17",
    "status": "ABSENT"
  }
]
```

**Manual Test**:
1. Go to attendance page
2. See list of attendance records (date, course, status)
3. Filter by course (optional)
4. Calculate attendance % (present/total)
5. Refresh → data persists

**Acceptance**:
- ✅ Attendance records display
- ✅ Attendance % calculated
- ✅ Course filter works
- ✅ No console errors
- ✅ Error toast on failure

---

## SPRINT 3: Student Payments (3 tasks)
**Duration**: 1-2 days  
**Dependencies**: Sprint 1 (basic structure)

### Task 3.1: Tuition Records & Dashboard (GET /api/student/tuition-records)
**Create**: `frontend/src/services/tuitionService.js`
```js
export async function getMyTuitionRecords() {
  return apiClient.get('/api/student/tuition-records');
}
```

**Create**: `frontend/src/pages/student/TuitionDashboard.jsx`
- Fetch tuition records in useEffect
- Display: List of tuition by semester
- Show: Amount, paid amount, balance, status
- Color code: Overdue (red), Pending (yellow), Paid (green)
- Loading & error states

**Example Response**:
```json
[
  {
    "id": 1,
    "semester": "Spring 2026",
    "totalAmount": 5000000,
    "paidAmount": 0,
    "remainingAmount": 5000000,
    "dueDate": "2026-06-01",
    "status": "PENDING"
  }
]
```

**Manual Test**:
1. Go to tuition dashboard
2. See all tuition records
3. Verify amounts correct
4. Status shows correctly (color coded)
5. Due date visible
6. Refresh → data persists

**Acceptance**:
- ✅ Tuition records display
- ✅ Amounts correct
- ✅ Status color-coded
- ✅ Due date shown
- ✅ Overdue highlighted
- ✅ Error toast on failure

---

### Task 3.2: Payment Creation (POST /api/student/payments)
**Add to**: `tuitionService.js`
```js
export async function createPayment(tuitionRecordId, amount, paymentProvider) {
  return apiClient.post('/api/student/payments', {
    tuitionRecordId,
    amount,
    paymentProvider // MOMO, ZALOPAY, BANK_TRANSFER
  });
}
```

**Add to**: `TuitionDashboard.jsx`
- Button: "Pay Now" on each tuition record
- Modal: Select amount, payment provider
- Submit: Call createPayment service
- Response: Show payment record + payment ID
- Status: Show "PENDING_CONFIRMATION" until webhook
- Success: Toast message

**Example Request**:
```json
{
  "tuitionRecordId": 1,
  "amount": 5000000,
  "paymentProvider": "MOMO"
}
```

**Manual Test**:
1. Click "Pay Now" on tuition record
2. Modal opens: Enter amount, select provider
3. Click "Pay"
4. Success toast shows
5. Payment record appears in list
6. Payment status = "PENDING_CONFIRMATION"
7. Mock webhook: Click "Mock Confirm Payment" (dev only)
8. Status → "CONFIRMED"

**Acceptance**:
- ✅ Payment modal works
- ✅ Form validation (amount > 0)
- ✅ API call correct
- ✅ Payment record created
- ✅ Status updates after mock confirm
- ✅ Error toast on failure
- ✅ No console errors

---

### Task 3.3: Payment History & Cancel (GET, PATCH)
**Add to**: `tuitionService.js`
```js
export async function getMyPayments() {
  return apiClient.get('/api/student/payments');
}

export async function cancelPayment(paymentId) {
  return apiClient.patch(`/api/student/payments/${paymentId}/cancel`);
}
```

**Create**: `frontend/src/pages/student/PaymentHistory.jsx`
- Fetch payments in useEffect
- Display: Table (Date, Amount, Provider, Status)
- Status: PENDING, CONFIRMED, FAILED, CANCELLED
- Color code: Confirmed (green), Pending (yellow), Failed (red)
- Button: Cancel (only for PENDING)
- Error states

**Manual Test**:
1. Go to payment history
2. See all past payments
3. Status correct, color-coded
4. Click "Cancel" on PENDING payment
5. Status → "CANCELLED"
6. Confirm button gone after cancel
7. Refresh → persists

**Acceptance**:
- ✅ All payments show in table
- ✅ Status correct + color-coded
- ✅ Cancel button only on PENDING
- ✅ Cancel works → status updates
- ✅ Error toast on failure
- ✅ No console errors

---

## SPRINT 4: Academic Requests (3 tasks)
**Duration**: 1-2 days  
**Dependencies**: Sprint 1 (auth working)

### Task 4.1: View Academic Requests (GET /api/student/academic-requests)
**Create**: `frontend/src/services/academicRequestService.js`
```js
export async function getMyRequests() {
  return apiClient.get('/api/student/academic-requests');
}
```

**Create**: `frontend/src/pages/student/AcademicRequests.jsx`
- Fetch requests in useEffect
- Display: Table (Type, Reason, Status, Created Date)
- Status: PENDING, APPROVED, REJECTED
- Color code: Approved (green), Pending (yellow), Rejected (red)
- Show: Approval date when approved
- Loading & error states

**Example Response**:
```json
[
  {
    "id": 1,
    "requestType": "DROP_COURSE",
    "reason": "Personal reasons",
    "status": "PENDING",
    "createdDate": "2026-05-16",
    "approvedDate": null,
    "approverName": null
  }
]
```

**Manual Test**:
1. Go to academic requests page
2. See all requests with status
3. Status color-coded correctly
4. Approval date shown when approved
5. Refresh → data persists

**Acceptance**:
- ✅ Requests display
- ✅ Status correct + color-coded
- ✅ All fields shown
- ✅ Loading state shown
- ✅ Error toast on failure

---

### Task 4.2: Create Academic Request (POST /api/student/academic-requests)
**Add to**: `academicRequestService.js`
```js
export async function createRequest(requestType, reason) {
  return apiClient.post('/api/student/academic-requests', {
    requestType, // DROP_COURSE, EXTEND_DEADLINE, LATE_REGISTRATION
    reason
  });
}
```

**Add to**: `AcademicRequests.jsx`
- Button: "Create New Request"
- Modal: Select request type, reason text area
- Validation: Type selected, reason > 10 chars
- Submit: Call createRequest service
- Success: Toast + request appears in list
- Status: PENDING initially

**Manual Test**:
1. Click "Create New Request"
2. Modal opens
3. Try submit empty → form error
4. Select type, enter reason
5. Click "Submit"
6. Success toast
7. New request appears in list with PENDING status

**Acceptance**:
- ✅ Form validation works
- ✅ API call correct
- ✅ Request created with PENDING status
- ✅ Appears in list immediately
- ✅ Error toast on failure
- ✅ No console errors

---

### Task 4.3: Student Notifications (GET /api/student/notifications)
**Add to**: `studentService.js`
```js
export async function getMyNotifications(isRead) {
  const query = isRead !== undefined ? `?isRead=${isRead}` : '';
  return apiClient.get(`/api/student/notifications${query}`);
}
```

**Create**: `frontend/src/pages/student/Notifications.jsx` (or notification bell in navbar)
- Fetch notifications in useEffect
- Display: List (Message, Type, Date, Read status)
- Filter: Unread, all
- Mark as read: Click notification
- Loading & error states

**Example Response**:
```json
[
  {
    "id": 1,
    "message": "Your grade for CS101 has been published",
    "type": "GRADE_PUBLISHED",
    "createdDate": "2026-05-16T10:00:00",
    "isRead": false
  }
]
```

**Manual Test**:
1. Go to notifications page / click notification bell
2. See unread notifications (bold)
3. Click notification → marked as read
4. Filter "Unread only" → only unread shown
5. Refresh → data persists

**Acceptance**:
- ✅ Notifications load + display
- ✅ Unread shown differently
- ✅ Click marks as read
- ✅ Filter works
- ✅ Loading + error states
- ✅ No console errors

---

## SPRINT 5: Admin - Student Management (4 tasks)
**Duration**: 1-2 days  
**Dependencies**: None (independent)

### Task 5.1: Admin Student List (GET /api/admin/students)
**Create**: `frontend/src/services/adminStudentService.js`
```js
export async function getAllStudents() {
  return apiClient.get('/api/admin/students');
}
```

**Create**: `frontend/src/pages/admin/StudentManagement.jsx`
- Fetch students in useEffect
- Display: Table (ID, Name, Email, Code, Status, Program)
- Search: By name or email
- Pagination: 10-20 per page
- Sort: By name, status
- Loading & error states

**Manual Test**:
1. Login as admin
2. Go to student management
3. See all students in table
4. Search by name → filters correctly
5. Pagination works
6. Sort by column → works
7. Refresh → persists

**Acceptance**:
- ✅ Students list loads
- ✅ All columns display correctly
- ✅ Search works
- ✅ Pagination works
- ✅ Sorting works
- ✅ Error toast on failure

---

### Task 5.2: Create & Edit Student (POST, PUT /api/admin/students)
**Add to**: `adminStudentService.js`
```js
export async function createStudent(data) {
  return apiClient.post('/api/admin/students', data);
}

export async function updateStudent(id, data) {
  return apiClient.put(`/api/admin/students/${id}`, data);
}
```

**Add to**: `StudentManagement.jsx`
- Button: "Create New Student"
- Modal: Form with fields (name, email, code, department, program, status)
- Validation: All required, email format, unique code
- Submit: Call API
- Success: Toast + student appears in list
- Edit: Click student row → opens modal with current data
- Update: Same form, PUT instead of POST

**Manual Test**:
1. Click "Create New Student"
2. Modal opens with empty form
3. Try submit empty → validation error
4. Fill fields, submit
5. Success toast
6. New student appears in list
7. Click student → modal opens with data
8. Change name, save
9. List updates

**Acceptance**:
- ✅ Create form validation works
- ✅ API call correct with all fields
- ✅ Student created + appears in list
- ✅ Edit form opens with current data
- ✅ Edit updates correctly
- ✅ Error toast on failure

---

### Task 5.3: Delete Student & Update Status (DELETE, PATCH)
**Add to**: `adminStudentService.js`
```js
export async function deleteStudent(id) {
  return apiClient.del(`/api/admin/students/${id}`);
}

export async function updateStudentStatus(id, status) {
  return apiClient.patch(`/api/admin/students/${id}/academic-status`, {
    academicStatus: status // ACTIVE, SUSPENDED, GRADUATED
  });
}
```

**Add to**: `StudentManagement.jsx`
- Action column: Delete, Change Status dropdown
- Delete: Confirmation modal before delete
- Status: Dropdown (ACTIVE, SUSPENDED, GRADUATED)
- Success: Toast + list updates
- Error: Toast + list unchanged

**Manual Test**:
1. Click delete icon on student
2. Confirmation modal appears
3. Click confirm → student deleted from list
4. Undo not possible (check with backend)
5. Click status dropdown
6. Change to SUSPENDED
7. Status updated in list
8. Refresh → persists

**Acceptance**:
- ✅ Delete confirmation modal
- ✅ Delete removes from list
- ✅ Status dropdown updates
- ✅ Changes persist after refresh
- ✅ Error toast on failure
- ✅ No console errors

---

### Task 5.4: Account Management (GET, POST, PATCH /api/admin/accounts)
**Create**: `frontend/src/services/adminAccountService.js`
```js
export async function getAllAccounts() {
  return apiClient.get('/api/admin/accounts');
}

export async function createAccount(data) {
  return apiClient.post('/api/admin/accounts', data);
}

export async function updateAccountStatus(id, isActive) {
  return apiClient.patch(`/api/admin/accounts/${id}/status`, {
    isActive
  });
}

export async function resetPassword(id, newPassword) {
  return apiClient.patch(`/api/admin/accounts/${id}/password`, {
    newPassword
  });
}
```

**Create**: `frontend/src/pages/admin/AccountManagement.jsx`
- Similar to StudentManagement
- Display: Table (ID, Username, Email, Role, Status)
- Create: Form with username, email, password, role (STUDENT/LECTURER/ADVISOR)
- Edit status: Activate/deactivate toggle
- Reset password: Modal with new password field
- Loading & error states

**Manual Test**:
1. Go to account management
2. See all accounts
3. Click "Create Account"
4. Fill form, submit
5. Success toast + appears in list
6. Click activate/deactivate → toggles
7. Click "Reset Password"
8. Enter new password, confirm
9. Account gets new password

**Acceptance**:
- ✅ All accounts display
- ✅ Create form works + validation
- ✅ Account created correctly
- ✅ Status toggle works
- ✅ Password reset works
- ✅ Error toast on failure
- ✅ No console errors

---

## SPRINT 6: Admin - Academic Catalog (4 tasks)
**Duration**: 1-2 days  
**Dependencies**: None (independent)

### Task 6.1: Department Management (GET, POST, PUT, DELETE)
**Create**: `frontend/src/services/adminCatalogService.js`
```js
export async function getDepartments() {
  return apiClient.get('/api/admin/catalog/departments');
}

export async function createDepartment(data) {
  return apiClient.post('/api/admin/catalog/departments', data);
}

export async function updateDepartment(id, data) {
  return apiClient.put(`/api/admin/catalog/departments/${id}`, data);
}

export async function deleteDepartment(id) {
  return apiClient.del(`/api/admin/catalog/departments/${id}`);
}
```

**Create**: `frontend/src/pages/admin/DepartmentManagement.jsx`
- Display: Table (ID, Name, Code, Description)
- Create: Form (name, code, description)
- Edit: Click row → modal
- Delete: With confirmation
- Loading & error states

**Manual Test**:
1. Go to department management
2. See all departments
3. Create new: Fill form, submit
4. Success + appears in list
5. Edit: Change name, save
6. Delete: Confirm, removed
7. Refresh → persists

**Acceptance**:
- ✅ Departments load + display
- ✅ Create/Edit/Delete work
- ✅ All fields correct
- ✅ Delete confirmation
- ✅ Error toast on failure
- ✅ No console errors

---

### Task 6.2: Program Management (GET, POST, PUT, DELETE)
... (file continues)
