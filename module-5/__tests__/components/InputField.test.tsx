import { render, fireEvent } from '@testing-library/react';
import InputField from '@/components/common/InputField';
import '@testing-library/jest-dom';

describe('InputField Component', () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    id: 'test-input',
    name: 'test',
    type: 'text',
    value: '',
    onChange: mockOnChange,
  };

  it('renders input field with label when provided', () => {
    const { getByLabelText } = render(
      <InputField {...defaultProps} label='Test Label' />
    );
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles onChange events', () => {
    const { getByRole } = render(<InputField {...defaultProps} />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('renders as disabled when disabled prop is true', () => {
    const { getByRole } = render(<InputField {...defaultProps} disabled />);
    expect(getByRole('textbox')).toBeDisabled();
  });
});
