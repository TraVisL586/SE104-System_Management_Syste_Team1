import apiClient from './apiClient';

export async function getMyTimetable() {
  return apiClient.get('/api/lecturer/timetable');
}

export async function getClassRoster(sectionId) {
  return apiClient.get(`/api/lecturer/course-sections/${sectionId}/roster`);
}

export async function getGrades(sectionId) {
  return apiClient.get(`/api/lecturer/course-sections/${sectionId}/grades`);
}

export async function updateGrade(enrollmentId, data) {
  return apiClient.put(`/api/lecturer/enrollments/${enrollmentId}/grade`, {
    processScore: data.processScore,
    midtermScore: data.midtermScore,
    finalScore: data.finalScore
  });
}

export async function publishGrade(enrollmentId) {
  return apiClient.patch(`/api/lecturer/enrollments/${enrollmentId}/grade/publish`);
}

export async function requestGradeUnlock(enrollmentId, reason) {
  return apiClient.post(`/api/lecturer/enrollments/${enrollmentId}/grade/unlock-requests`, {
    reason
  });
}

// ── Attendance ──────────────────────────────────────────────────────────────
export async function getAttendance(sectionId, date) {
  return apiClient.get(`/api/lecturer/course-sections/${sectionId}/attendance?date=${date}`);
}

export async function recordAttendance(sectionId, data) {
  return apiClient.put(`/api/lecturer/course-sections/${sectionId}/attendance`, data);
}

// ── Announcements ───────────────────────────────────────────────────────────
export async function getAnnouncements(sectionId) {
  return apiClient.get(`/api/lecturer/course-sections/${sectionId}/announcements`);
}

export async function createAnnouncement(sectionId, data) {
  return apiClient.post(`/api/lecturer/course-sections/${sectionId}/announcements`, data);
}

export default {
  getMyTimetable,
  getClassRoster,
  getGrades,
  updateGrade,
  publishGrade,
  requestGradeUnlock,
  getAttendance,
  recordAttendance,
  getAnnouncements,
  createAnnouncement,
};
