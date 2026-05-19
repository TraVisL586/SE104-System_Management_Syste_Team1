import apiClient from './apiClient';

export async function getMyStudents() {
  return apiClient.get('/api/advisor/students');
}

export async function getStudentProfile(studentId) {
  return apiClient.get(`/api/advisor/students/${studentId}/profile`);
}

export async function getAdvisorRequests(status = '') {
  const query = status ? `?status=${status}` : '';
  return apiClient.get(`/api/advisor/academic-requests${query}`);
}

export async function decideAcademicRequest(requestId, approved, advisorNote) {
  return apiClient.patch(`/api/advisor/academic-requests/${requestId}/decision`, {
    approved,
    advisorNote
  });
}

export default {
  getMyStudents,
  getStudentProfile,
  getAdvisorRequests,
  decideAcademicRequest,
};
