import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as AuthService from '../src/services/AuthService';

describe('AuthService.login', () => {
  const globalFetch = global.fetch;

  afterEach(() => {
    global.fetch = globalFetch;
    vi.restoreAllMocks();
  });

  it('resolves with token and user on success', async () => {
    const mockResponse = { token: 'abc', user: { id: 'SV001', role: 'STUDENT' } };
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) }));

    const res = await AuthService.login({ identifier: 'SV001', password: 'pass' });
    expect(res).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('throws an error when backend returns non-ok', async () => {
    const mockErr = { message: 'Invalid credentials' };
    global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 401, json: () => Promise.resolve(mockErr) }));

    await expect(AuthService.login({ identifier: 'x', password: 'y' })).rejects.toThrow('Invalid credentials');
  });
});
