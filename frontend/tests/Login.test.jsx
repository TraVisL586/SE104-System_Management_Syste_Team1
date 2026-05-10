import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/public/Login';

vi.mock('../src/services/AuthService', () => ({
  login: vi.fn(),
}));

import AuthService from '../src/services/AuthService';

describe('Login form', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows error message when AuthService rejects', async () => {
    AuthService.login.mockRejectedValue(new Error('Invalid credentials'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Student ID \/ Staff Email/i), { target: { value: 'SV001' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    const err = await screen.findByText(/Invalid credentials/i);
    expect(err).toBeTruthy();
  });
});
