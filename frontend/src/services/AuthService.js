// Lightweight AuthService for logging in users.
// Exports a single async `login(credentials)` which returns the parsed
// response from the backend: { token, user }
// The backend is expected to return JSON like: { token: '...', user: { id, name, role } }

import apiClient from './apiClient';

export async function login(credentials) {
  // Delegate to apiClient so base URL and headers are centralized
  return apiClient.post('/api/auth/login', credentials);
}

export default { login };
