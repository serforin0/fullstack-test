import React, { useState } from 'react';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange?: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate: initialDate = new Date('2024-03-31'), onDateChange }) => {
  const [date, setDate] = useState(initialDate);
  const [error, setError] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part to compare only the date part

    if (isNaN(newDate.getTime())) {
      setError('Invalid date');
    } else if (newDate > today) {
      setError('Invalid date');
    } else {
      setDate(newDate);
      setError('');
      if (onDateChange) {
        onDateChange(newDate);
      }
    }
  };

  return (
    <>
      <input
        type="date"
        value={date.toISOString().substr(0, 10)} // Usa value en lugar de defaultValue
        onChange={handleDateChange} // Usa onChange para manejar los cambios de fecha
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
};

export default DateSelector;
