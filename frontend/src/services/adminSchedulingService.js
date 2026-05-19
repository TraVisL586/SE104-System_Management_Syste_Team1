import apiClient from './apiClient';

// ── Semesters ───────────────────────────────────────────────────────────────
export async function getSemesters() {
  return apiClient.get('/api/admin/scheduling/semesters');
}
export async function createSemester(data) {
  return apiClient.post('/api/admin/scheduling/semesters', data);
}
export async function updateSemester(id, data) {
  return apiClient.put(`/api/admin/scheduling/semesters/${id}`, data);
}
export async function deleteSemester(id) {
  return apiClient.del(`/api/admin/scheduling/semesters/${id}`);
}

// ── Rooms ───────────────────────────────────────────────────────────────────
export async function getRooms() {
  return apiClient.get('/api/admin/scheduling/rooms');
}
export async function createRoom(data) {
  return apiClient.post('/api/admin/scheduling/rooms', data);
}
export async function updateRoom(id, data) {
  return apiClient.put(`/api/admin/scheduling/rooms/${id}`, data);
}
export async function deleteRoom(id) {
  return apiClient.del(`/api/admin/scheduling/rooms/${id}`);
}

// ── Course Sections ─────────────────────────────────────────────────────────
export async function getCourseSections() {
  return apiClient.get('/api/admin/scheduling/course-sections');
}
export async function getCourseSection(id) {
  return apiClient.get(`/api/admin/scheduling/course-sections/${id}`);
}
export async function createCourseSection(data) {
  return apiClient.post('/api/admin/scheduling/course-sections', data);
}
export async function updateCourseSection(id, data) {
  return apiClient.put(`/api/admin/scheduling/course-sections/${id}`, data);
}
export async function deleteCourseSection(id) {
  return apiClient.del(`/api/admin/scheduling/course-sections/${id}`);
}

// ── Schedules (per section) ─────────────────────────────────────────────────
export async function getCourseSectionSchedules(sectionId) {
  return apiClient.get(`/api/admin/scheduling/course-sections/${sectionId}/schedules`);
}
export async function addCourseSectionSchedule(sectionId, data) {
  return apiClient.post(`/api/admin/scheduling/course-sections/${sectionId}/schedules`, data);
}
export async function removeCourseSectionSchedule(sectionId, scheduleId) {
  return apiClient.del(`/api/admin/scheduling/course-sections/${sectionId}/schedules/${scheduleId}`);
}

export default {
  getSemesters, createSemester, updateSemester, deleteSemester,
  getRooms, createRoom, updateRoom, deleteRoom,
  getCourseSections, getCourseSection, createCourseSection, updateCourseSection, deleteCourseSection,
  getCourseSectionSchedules, addCourseSectionSchedule, removeCourseSectionSchedule,
};
