import apiClient from './apiClient';

export async function getMyRequests() {
  return apiClient.get('/api/student/academic-requests');
}

export async function createRequest(type, title, content, attachmentUrl = null) {
  return apiClient.post('/api/student/academic-requests', {
    type,
    title,
    content,
    attachmentUrl
  });
}

export default {
  getMyRequests,
  createRequest,
};
