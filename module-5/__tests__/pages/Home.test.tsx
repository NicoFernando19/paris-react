import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/pages';

describe('Home Testing', () => {
  it('render heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('render default text', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Welcome to ShopMart',
    });
    expect(heading).toBeInTheDocument();
  });
});
