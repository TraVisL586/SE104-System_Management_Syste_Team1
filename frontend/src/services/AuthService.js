// Lightweight AuthService for logging in users.
// Exports a single async `login(credentials)` which returns the parsed
// response from the backend: { token, user }
// The backend is expected to return JSON like: { token: '...', user: { id, name, role } }

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
// DEV MOCK — tắt khi backend sẵn sàng bằng cách đặt VITE_USE_MOCK=false
// ---------------------------------------------------------------------------
const USE_MOCK = true; // ← đổi thành false khi có backend thật

const MOCK_ACCOUNTS = [
  { identifier: 'sv001@gmail.com',        password: '123456', token: 'mock-token-student',  user: { id: 1, name: 'Nguyễn Văn A',  role: 'STUDENT'        } },
  { identifier: 'gv001@gmail.com',   password: '123456', token: 'mock-token-lecturer', user: { id: 2, name: 'Trần Thị B',    role: 'LECTURER'       } },
  { identifier: 'admin1@gmail.com',password: '123456', token: 'mock-token-admin',    user: { id: 3, name: 'Lê Văn C',      role: 'ACADEMIC_ADMIN' } },
  { identifier: 'admin2@gmail.com',password: '123456', token: 'mock-token-admin',    user: { id: 4, name: 'Lê Văn D',      role: 'IT_ADMIN' } },
];

function mockLogin(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const account = MOCK_ACCOUNTS.find(
        (a) => a.identifier === credentials.identifier && a.password === credentials.password,
      );
      if (account) {
        resolve({ token: account.token, user: account.user });
      } else {
        reject(new Error('Sai tài khoản hoặc mật khẩu'));
      }
    }, 400); // giả lập độ trễ mạng
  });
}
// ---------------------------------------------------------------------------

export async function login(credentials) {
  if (USE_MOCK) return mockLogin(credentials);
  return apiClient.post('/api/auth/login', credentials);
}

export default { login };