import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectingStart, setSelectingStart] = useState(false);
  const [tempStart, setTempStart] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (date: Date) => {
    if (selectingStart || date < startDate) {
      setTempStart(date);
      setSelectingStart(false);
    } else {
      if (tempStart) {
        onChange(tempStart, date);
        setTempStart(null);
      } else {
        onChange(date, endDate);
      }
    }
  };

  const handleDateHover = (date: Date) => {
    setHoveredDate(date);
  };

  const isDateInRange = (date: Date) => {
    const start = tempStart || startDate;
    const end = selectingStart ? hoveredDate || endDate : endDate;
    return date >= start && date <= end;
  };

  const isStartDate = (date: Date) => {
    return date.toDateString() === (tempStart || startDate).toDateString();
  };

  const isEndDate = (date: Date) => {
    return date.toDateString() === endDate.toDateString();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isInRange = isDateInRange(date);
      const isStart = isStartDate(date);
      const isEnd = isEndDate(date);

      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => handleDateHover(date)}
          className={`flex size-10 items-center justify-center rounded-full text-sm
            ${isToday ? 'border border-indigo-300' : ''}
            ${isInRange ? 'bg-indigo-100' : ''}
            ${isStart ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
            ${isEnd ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
            ${!isInRange && !isStart && !isEnd ? 'hover:bg-gray-100' : ''}
          `}
        >
          {day}
        </motion.button>,
      );
    }

    return days;
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-medium">
          {currentMonth.toLocaleDateString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <button
          onClick={nextMonth}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Start Date</p>
          <p className="text-sm font-medium">
            {(tempStart || startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">End Date</p>
          <p className="text-sm font-medium">{endDate.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => {
            setTempStart(null);
            setSelectingStart(true);
          }}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={() => {
            if (tempStart) {
              onChange(tempStart, endDate);
              setTempStart(null);
            }
          }}
          className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
