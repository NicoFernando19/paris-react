import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/specific/Header';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Header Component Test', () => {
  const mockSetAuth = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      router: '/',
      pathname: '/',
      quert: {},
      asPath: '/',
      push: jest.fn(),
    }));
    (useAuth as jest.Mock).mockReturnValue({ setAuth: mockSetAuth });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render Header with expected title', () => {
    render(<Header headerTitle='Test Header' />);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('render login link when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    render(<Header headerTitle='Test Header' />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('render Profile link when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    render(<Header headerTitle='Test Header' />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
