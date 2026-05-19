import apiClient from './apiClient';

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

export default {
  getAllAccounts,
  createAccount,
  updateAccountStatus,
  resetPassword,
};
