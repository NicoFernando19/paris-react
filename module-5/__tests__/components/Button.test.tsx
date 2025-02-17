import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/common/Button';

describe('Button Component Test', () => {
  const mockOnClick = jest.fn();

  it('render button with expected label', () => {
    render(<Button onClick={mockOnClick} label='Test Button' />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick handler when button clicked', () => {
    render(<Button onClick={mockOnClick} label='Test Button' />);
    fireEvent.click(screen.getByText('Test Button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(
      <Button
        onClick={mockOnClick}
        label='Test Button'
        className='custom-class-name'
      />
    );
    expect(screen.getByText('Test Button')).toHaveClass('custom-class-name');
  });
});
