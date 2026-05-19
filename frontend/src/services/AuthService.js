// Lightweight AuthService for logging in users.
// Exports a single async `login(credentials)` which returns the parsed
// response from the backend: { token, username, email, fullName, roles }

import apiClient from './apiClient';

export async function login(credentials) {
  const payload = {
    username: credentials?.username || '',
    password: credentials?.password || '',
  };
  return apiClient.post('/api/auth/login', payload);
}

export default { login };