import { CalendarIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';
import ReactDatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import { applyDatePickerStyles } from '../../lib/datepicker-utils';
import './datepicker-overrides.css';

// Add data-theme to body for CSS targeting
if (typeof document !== 'undefined') {
  document.body.setAttribute('data-theme', 'space');
}

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

// Custom input component for the date picker
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ value, onClick, onChange, placeholder }, ref) => (
  <div className="relative">
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      onChange={onChange}
      placeholder={placeholder}
      readOnly
      className="w-full px-4 py-2 pl-10 text-white bg-white-10 border border-white-20 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:border-transparent placeholder-white-60 cursor-pointer"
    />
    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white-60 pointer-events-none" />
  </div>
));

CustomInput.displayName = 'CustomInput';

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const selectedDate = value ? new Date(value) : null;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange(date.toISOString().split('T')[0]);
    }
  };

  return (
    <div className={cn('relative space-theme-calendar', className)} data-theme="space">
      <label htmlFor="date-picker" className="sr-only">
        Select Date
      </label>
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select date"
        customInput={<CustomInput />}
        popperClassName="nasa-datepicker-popper space-theme-calendar"
        calendarClassName="nasa-datepicker-calendar space-theme-calendar"
        wrapperClassName="w-full"
        showPopperArrow={false}
        onCalendarOpen={() => {
          // Apply comprehensive styles using our utility function
          // Apply immediately and then again after a delay to ensure styling
          applyDatePickerStyles();
          setTimeout(applyDatePickerStyles, 10);
          setTimeout(applyDatePickerStyles, 50);
        }}
        onCalendarClose={() => {
          // Clean up any event listeners if needed
        }}
      />
    </div>
  );
}
