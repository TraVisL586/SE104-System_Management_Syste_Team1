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

// For viewing timetables
export async function getStudentTimetable() {
  return apiClient.get('/api/student/timetable');
}

export async function getLecturerTimetable() {
  return apiClient.get('/api/lecturer/timetable');
}

// For managing course section schedules (admin)
export async function getCourseSectionSchedules(sectionId) {
  return apiClient.get(`/api/course-sections/${sectionId}/schedules`);
}

export async function addCourseSectionSchedule(sectionId, scheduleData) {
  return apiClient.post(`/api/course-sections/${sectionId}/schedules`, scheduleData);
}

export async function removeCourseSectionSchedule(sectionId, scheduleId) {
  return apiClient.del(`/api/course-sections/${sectionId}/schedules/${scheduleId}`);
}

export default {
  getStudentTimetable,
  getLecturerTimetable,
  getCourseSectionSchedules,
  addCourseSectionSchedule,
  removeCourseSectionSchedule,
};
