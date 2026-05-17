import apiClient from './apiClient';

export async function getMyTuitionRecords() {
  return apiClient.get('/api/student/tuition-records');
}

export async function getMyPayments() {
  return apiClient.get('/api/student/payments');
}

export async function createPayment(tuitionRecordId, amount, provider) {
  return apiClient.post('/api/student/payments', {
    tuitionRecordId,
    amount,
    provider, // MOMO, STRIPE, BANK_TRANSFER, etc.
  });
}

export async function cancelPayment(paymentId) {
  return apiClient.patch(`/api/student/payments/${paymentId}/cancel`);
}

export async function mockConfirmPayment(paymentId, success, providerReference) {
  return apiClient.post(`/api/student/payments/${paymentId}/mock-confirm`, {
      success,
      providerReference
  });
}

export default {
  getMyTuitionRecords,
  getMyPayments,
  createPayment,
  cancelPayment,
  mockConfirmPayment
};
