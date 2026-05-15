# Hướng dẫn: Liên kết Frontend và Backend

## Quy trình chung (Pattern) để liên kết FE/BE

Dựa trên ví dụ Course Registration và Timetable, đây là mẫu chuẩn để liên kết bất kỳ tính năng nào:

---

## Bước 1: Tạo Service File

**Đặt tại:** `frontend/src/services/{featureName}Service.js`

Mẫu cơ bản:
```javascript
import apiClient from './apiClient';

function buildQuery(params) {
  const search = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : '';
}

// API endpoints
export async function getList(params = {}) {
  const query = buildQuery(params);
  return apiClient.get(`/api/{endpoint}${query}`);
}

export async function getById(id) {
  return apiClient.get(`/api/{endpoint}/${id}`);
}

export async function create(data) {
  return apiClient.post(`/api/{endpoint}`, data);
}

export async function update(id, data) {
  return apiClient.put(`/api/{endpoint}/${id}`, data);
}

export async function delete(id) {
  return apiClient.del(`/api/{endpoint}/${id}`);
}

export default {
  getList,
  getById,
  create,
  update,
  delete,
};
```

---

## Bước 2: Import Service vào Component

```javascript
import {featureName}Service from '../../services/{featureName}Service';
```

---

## Bước 3: Sử dụng Service để fetch dữ liệu

### A. Setup loading states:
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const { showToast } = useToast();

useEffect(() => {
  loadData();
}, []);

const loadData = useCallback(async () => {
  try {
    setLoading(true);
    const response = await {featureName}Service.getList();
    setData(Array.isArray(response) ? response : []);
  } catch (err) {
    setData([]);
    const message = err?.data?.message || err?.message || "Không thể tải dữ liệu.";
    showToast("error", "Lỗi tải dữ liệu", message);
  } finally {
    setLoading(false);
  }
}, [showToast]);
```

### B. Xử lý thêm/sửa/xóa:
```javascript
const handleAdd = async (formData) => {
  try {
    setSubmitting(true);
    const response = await {featureName}Service.create(formData);
    setData(prev => [...prev, response]);
    showToast("success", "Thành công", "Đã thêm dữ liệu.");
  } catch (err) {
    const message = err?.data?.message || "Không thể thêm dữ liệu.";
    showToast("error", "Lỗi", message);
  } finally {
    setSubmitting(false);
  }
};

const handleDelete = async (id) => {
  try {
    setSubmitting(true);
    await {featureName}Service.delete(id);
    setData(prev => prev.filter(item => item.id !== id));
    showToast("info", "Đã xóa", "Dữ liệu đã được xóa.");
  } catch (err) {
    const message = err?.data?.message || "Không thể xóa dữ liệu.";
    showToast("error", "Lỗi", message);
  } finally {
    setSubmitting(false);
  }
};
```

### C. Hiển thị trạng thái loading:
```javascript
{loading && <div>Đang tải...</div>}
{error && <div>{error}</div>}
{data.length > 0 && <YourComponent data={data} />}
```

---

## Bước 4: Commit và Push

```bash
# Kiểm tra thay đổi
git status

# Thêm vào staging
git add .

# Commit với tin nhắn rõ ràng
git commit -m "feat: Liên kết FE/BE cho {feature name}

- Tạo {featureName}Service.js với API wrappers
- Cập nhật component để fetch dữ liệu từ API
- Thêm error handling và toast notifications"

# Push lên remote
git push origin {branch-name}
```

---

## Ví dụ cụ thể: Timetable

### Backend Endpoints:
```
GET    /api/student/timetable          - Lấy TKB của sinh viên
GET    /api/lecturer/timetable         - Lấy TKB của giảng viên
GET    /api/course-sections/{id}/schedules    - Lấy lịch của 1 lớp học phần
POST   /api/course-sections/{id}/schedules    - Thêm lịch
DELETE /api/course-sections/{id}/schedules/{scheduleId} - Xóa lịch
```

### Service (timetableService.js):
```javascript
export async function getStudentTimetable() {
  return apiClient.get('/api/student/timetable');
}

export async function getLecturerTimetable() {
  return apiClient.get('/api/lecturer/timetable');
}

export async function addCourseSectionSchedule(sectionId, scheduleData) {
  return apiClient.post(`/api/course-sections/${sectionId}/schedules`, scheduleData);
}
```

### Component (TimetableManager.jsx):
```javascript
const loadTimetable = useCallback(async () => {
  try {
    setLoading(true);
    const data = await timetableService.getLecturerTimetable();
    setSchedule(Array.isArray(data) ? data : []);
  } catch (err) {
    setSchedule([]);
    showToast("error", "Lỗi tải dữ liệu", err?.message);
  } finally {
    setLoading(false);
  }
}, [showToast]);
```

---

## Checklist khi liên kết một feature:

- [ ] Kiểm tra backend endpoints đã tồn tại
- [ ] Tạo Service file với tất cả API functions cần thiết
- [ ] Import Service vào Component
- [ ] Thêm loading/error states
- [ ] Replace hardcoded data bằng API calls
- [ ] Thêm error handling với Toast notifications
- [ ] Test trên browser (F12 → Network tab để kiểm tra API calls)
- [ ] Commit với tin nhắn rõ ràng
- [ ] Push lên remote branch

---

## Ghi chú quan trọng:

1. **Authorization**: apiClient.js tự động thêm Bearer token từ localStorage
2. **Error Handling**: Luôn catch errors và hiển thị với Toast
3. **Loading States**: Thêm loading indicator để UX tốt hơn
4. **API Chuẩn**: Kiểm tra API docs/backend code trước khi viết service

