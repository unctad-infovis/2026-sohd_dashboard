import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CalendarContainer from './CalendarContainer.jsx';
import { datePickerHolidays } from '../config/referenceDates.js';

const range = (start, end, step) => {
  const result = [];
  for (let i = start; i <= end; i += step) result.push(i);
  return result;
};

const getYear = (date) => date.getFullYear();
const getMonth = (date) => date.getMonth();

const years = range(2019, getYear(new Date()) + 1, 1);

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const DatePickerTrigger = forwardRef(({
  value,
  placeholder,
  className,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  disabled,
  tabIndex,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
}, ref) => (
  <button
    type="button"
    ref={ref}
    className={['date-picker-trigger', className].filter(Boolean).join(' ')}
    onClick={onClick}
    onFocus={onFocus}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    disabled={disabled}
    tabIndex={tabIndex}
    aria-label="Select reference date"
    aria-describedby={ariaDescribedBy}
    aria-labelledby={ariaLabelledBy}
  >
    {value || placeholder}
  </button>
));

DatePickerTrigger.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  'aria-describedby': PropTypes.string,
  'aria-labelledby': PropTypes.string,
};

DatePickerTrigger.defaultProps = {
  value: '',
  placeholder: '',
  className: '',
  onClick: null,
  onFocus: null,
  onBlur: null,
  onKeyDown: null,
  disabled: false,
  tabIndex: undefined,
  'aria-describedby': undefined,
  'aria-labelledby': undefined,
};

function CalendarDatePicker({ selectedDate, onChange, onCustomDateSelect }) {
  const pickerRef = useRef(null);

  const handleCustomDate = (date) => {
    onCustomDateSelect(date);
    if (pickerRef.current) pickerRef.current.setOpen(false);
  };

  const calendarContainer = ({ className, children }) => (
    <CalendarContainer
      className={className}
      setCustomDate={handleCustomDate}
      onClose={() => pickerRef.current.setOpen(false)}
    >
      {children}
    </CalendarContainer>
  );

  return (
    <DatePicker
      ref={pickerRef}
      className=""
      customInput={<DatePickerTrigger />}
      showIcon
      showPreviousMonths
      withPortal
      portalId="sohd-dashboard-datepicker-portal"
      monthsShown={1}
      selected={selectedDate}
      onChange={onChange}
      calendarContainer={calendarContainer}
      dateFormat="d MMMM yyyy"
      showTimeSelect={false}
      peekNextMonth
      holidays={datePickerHolidays}
      minDate={new Date('2019-01-01')}
      maxDate={new Date()}
      placeholderText="Select Reference Date"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div style={{ margin: 10, display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {'<'}
          </button>

          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {'>'}
          </button>
        </div>
      )}
      icon={(
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50">
          <path
            id="ic_today_24px"
            className="st0"
            fill="white"
            d="M42.5,5H40V0h-5v5H15V0h-5v5H7.5c-2.7,0-5,2.2-5,5c0,0,0,0,0,0l0,35c0,2.8,2.2,5,5,5c0,0,0,0,0,0h35c2.8,0,5-2.2,5-5V10C47.5,7.2,45.3,5,42.5,5z M42.5,45h-35V17.5h35V45z M12.5,22.5H25V35H12.5V22.5z"
          />
        </svg>
      )}
    />
  );
}

CalendarDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  onCustomDateSelect: PropTypes.func.isRequired,
};

CalendarDatePicker.defaultProps = {
  selectedDate: null,
};

export default CalendarDatePicker;
