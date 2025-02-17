import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Login from '@/pages/login';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Login Page testing', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockSetAuth = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({ setAuth: mockSetAuth });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('john@doe.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });
});
