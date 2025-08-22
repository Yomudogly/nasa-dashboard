import { render } from '@testing-library/react';
import { DatePicker } from '../components/ui/DatePicker';

// Mock react-datepicker completely for testing
jest.mock('react-datepicker', () => {
  const MockDatePicker = (props: { selected?: Date }) => (
    <div data-testid="react-datepicker-mock">
      <input 
        data-testid="date-picker-input"
        value={props.selected ? props.selected.toISOString().split('T')[0] : ''}
        readOnly
      />
    </div>
  );
  MockDatePicker.displayName = 'MockDatePicker';
  return MockDatePicker;
});

describe('DatePicker', () => {
  it('renders without crashing', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <DatePicker
        value="2025-08-21"
        onChange={mockOnChange}
      />
    );

    expect(container).toBeDefined();
  });

  it('applies custom className to container', () => {
    const mockOnChange = jest.fn();
    
    const { container } = render(
      <DatePicker
        value="2025-08-21"
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    const datePickerContainer = container.querySelector('.custom-class');
    expect(datePickerContainer).toBeTruthy();
  });

  it('handles empty value correctly', () => {
    const mockOnChange = jest.fn();
    
    const { container } = render(
      <DatePicker
        value=""
        onChange={mockOnChange}
      />
    );

    expect(container).toBeDefined();
  });
});
