// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function parseDate(input: string) {
  // Transform date from text to date
  const parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])); // months are 0-based
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getTotalDays(firstDate: string, lastDate: string) {
  /* Two working days and an sunday (not working day) */
  const holidays = ['2024-05-27'];
  const startDate = parseDate(firstDate);
  const endDate = parseDate(lastDate);

  // Validate input
  if (endDate < startDate) {
    return 0;
  }

  if (endDate === startDate) {
    return 1;
  }

  // Calculate days between dates
  const millisecondsPerDay = 86400 * 1000; // Day in milliseconds
  startDate.setHours(0, 0, 0, 1); // Start just after midnight
  endDate.setHours(23, 59, 59, 999); // End just before midnight
  const diff = Number(endDate) - Number(startDate); // Milliseconds between datetime objects
  let days = Math.ceil(diff / millisecondsPerDay);

  // Subtract two weekend days for every week in between
  const weeks = Math.floor(days / 7);
  days -= weeks * 2;

  // Handle special cases
  const startDay = startDate.getDay();
  const endDay = endDate.getDay();

  // Remove weekend not previously removed.
  if (startDay - endDay > 1) {
    days -= 2;
  }
  // Remove start day if span starts on Sunday but ends before Saturday
  if (startDay == 0 && endDay != 6) {
    days--;
  }
  // Remove end day if span ends on Saturday but starts after Sunday
  if (endDay == 6 && startDay != 0) {
    days--;
  }
  /* Here is the code */
  holidays.forEach(day => {
    if (day >= firstDate && day <= lastDate) {
      /* If it is not saturday (6) or sunday (0), substract it */
      if (parseDate(day).getDay() % 6 != 0) {
        days--;
      }
    }
  });
  return days;
}
