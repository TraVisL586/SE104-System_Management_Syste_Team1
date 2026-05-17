import apiClient from './apiClient';

export async function getAllStudents() {
  return apiClient.get('/api/admin/students');
}

export async function createStudent(data) {
  return apiClient.post('/api/admin/students', data);
}

export async function updateStudent(id, data) {
  return apiClient.put(`/api/admin/students/${id}`, data);
}

export async function deleteStudent(id) {
  return apiClient.del(`/api/admin/students/${id}`);
}

export async function updateStudentStatus(id, academicStatus) {
  return apiClient.patch(`/api/admin/students/${id}/academic-status`, {
    academicStatus
  });
}

export default {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  updateStudentStatus,
};
