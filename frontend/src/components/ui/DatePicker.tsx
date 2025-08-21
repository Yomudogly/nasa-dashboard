import { CalendarIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  return (
    <div className={cn('relative', className)}>
      <label htmlFor="date-picker" className="sr-only">
        Select Date
      </label>
      <div className="relative">
        <input
          id="date-picker"
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate.toISOString().split('T')[0]}
          max={maxDate.toISOString().split('T')[0]}
          className="w-full px-4 py-2 pl-10 text-white bg-white-10 border border-white-20 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:border-transparent placeholder-white-60"
        />
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white-60" />
      </div>
    </div>
  );
}
