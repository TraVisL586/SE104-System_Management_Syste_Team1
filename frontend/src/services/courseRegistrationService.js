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

export async function getOpenSections({ semesterId, keyword } = {}) {
  const query = buildQuery({ semesterId, keyword });
  return apiClient.get(`/api/student/course-sections/open${query}`);
}

export async function getMyRegistrations() {
  return apiClient.get('/api/student/registrations');
}

export async function registerSection(courseSectionId) {
  return apiClient.post('/api/student/registrations', { courseSectionId });
}

export async function cancelRegistration(enrollmentId) {
  return apiClient.del(`/api/student/registrations/${enrollmentId}`);
}

export default {
  getOpenSections,
  getMyRegistrations,
  registerSection,
  cancelRegistration,
};
