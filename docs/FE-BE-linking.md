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
