// Lightweight AuthService for logging in users.
// Exports a single async `login(credentials)` which returns the parsed
// response from the backend: { token, username, email, fullName, roles }

import apiClient from './apiClient';

//// tạm thời // để test đăng nhập
//export async function login(credentials) {
//  // Delegate to apiClient so base URL and headers are centralized
//  return apiClient.post('/api/auth/login', credentials);
//}
//
//export default { login };
//


// ---------------------------------------------------------------------------
// DEV MOCK — bật bằng cách đặt VITE_USE_MOCK=true
// ---------------------------------------------------------------------------
const USE_MOCK = (import.meta.env.VITE_USE_MOCK || '').toLowerCase() === 'true';

const MOCK_ACCOUNTS = [
  { username: 'sv001@gmail.com',    password: '123456', token: 'mock-token-student',  user: { id: 1, name: 'Nguyễn Văn A',  role: 'STUDENT' } },
  { username: 'gv001@gmail.com',    password: '123456', token: 'mock-token-lecturer', user: { id: 2, name: 'Trần Thị B',    role: 'LECTURER' } },
  { username: 'admin1@gmail.com',   password: '123456', token: 'mock-token-admin',    user: { id: 3, name: 'Lê Văn C',      role: 'ADMIN' } },
  { username: 'advisor1@gmail.com', password: '123456', token: 'mock-token-advisor',  user: { id: 4, name: 'Lê Văn D',      role: 'ACADEMIC_ADVISOR' } },
];

function mockLogin(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const account = MOCK_ACCOUNTS.find(
        (a) => a.username === credentials.username && a.password === credentials.password,
      );
      if (account) {
        resolve({ token: account.token, user: account.user, roles: [account.user.role], username: account.username, fullName: account.user.name });
      } else {
        reject(new Error('Sai tài khoản hoặc mật khẩu'));
      }
    }, 400); // giả lập độ trễ mạng
  });
}
// ---------------------------------------------------------------------------

export async function login(credentials) {
  const payload = {
    username: credentials?.username || credentials?.identifier || credentials?.email || '',
    password: credentials?.password || '',
  };
  if (USE_MOCK) return mockLogin(payload);
  return apiClient.post('/api/auth/login', payload);
}

export default { login };