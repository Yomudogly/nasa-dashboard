/**
 * Utility function to forcefully apply NASA space theme styles to react-datepicker
 * This function ensures proper layout and styling for the calendar
 */
export const applyDatePickerStyles = () => {
  // Set data-theme on body
  document.body.setAttribute('data-theme', 'space');
  
  setTimeout(() => {
    const calendar = document.querySelector('.react-datepicker');
    if (!calendar) return;

    // Add our custom class
    calendar.classList.add('space-theme-calendar');

    // Ensure proper layout structure
    const month = calendar.querySelector('.react-datepicker__month');
    const dayNames = calendar.querySelector('.react-datepicker__day-names');
    const weeks = calendar.querySelectorAll('.react-datepicker__week');

    // Fix layout issues
    if (month) {
      (month as HTMLElement).style.display = 'flex';
      (month as HTMLElement).style.flexDirection = 'column';
    }

    if (dayNames) {
      (dayNames as HTMLElement).style.display = 'flex';
      (dayNames as HTMLElement).style.flexDirection = 'row';
      (dayNames as HTMLElement).style.justifyContent = 'space-between';
    }

    weeks.forEach(week => {
      (week as HTMLElement).style.display = 'flex';
      (week as HTMLElement).style.flexDirection = 'row';
      (week as HTMLElement).style.justifyContent = 'space-between';
    });

    // Apply core calendar styling
    const calendarEl = calendar as HTMLElement;
    calendarEl.style.cssText += `
      background: rgba(17, 24, 39, 0.95) !important;
      backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(99, 102, 241, 0.3) !important;
      border-radius: 16px !important;
      color: white !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
    `;

    // Style header
    const header = calendar.querySelector('.react-datepicker__header') as HTMLElement;
    if (header) {
      header.style.cssText += `
        background: rgba(17, 24, 39, 0.8) !important;
        border-bottom: 1px solid rgba(99, 102, 241, 0.2) !important;
        color: white !important;
      `;
    }

    // Style current month
    const currentMonth = calendar.querySelector('.react-datepicker__current-month') as HTMLElement;
    if (currentMonth) {
      currentMonth.style.cssText += `
        color: white !important;
        font-weight: 600 !important;
        text-shadow: 0 0 10px rgba(99, 102, 241, 0.3) !important;
      `;
    }

    // Force proper day styling
    const days = calendar.querySelectorAll('.react-datepicker__day');
    days.forEach(day => {
      const dayEl = day as HTMLElement;
      dayEl.style.cssText += `
        color: rgba(255, 255, 255, 0.8) !important;
        background: transparent !important;
        border-radius: 8px !important;
        width: 32px !important;
        height: 32px !important;
        line-height: 32px !important;
        text-align: center !important;
        transition: all 0.2s ease !important;
      `;
    });

    // Style selected day
    const selectedDay = calendar.querySelector('.react-datepicker__day--selected') as HTMLElement;
    if (selectedDay) {
      selectedDay.style.cssText += `
        background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
        color: white !important;
        font-weight: 700 !important;
      `;
    }

    // Hide triangle
    const triangle = calendar.querySelector('.react-datepicker__triangle') as HTMLElement;
    if (triangle) {
      triangle.style.display = 'none !important';
    }
  }, 10);
};
