import moment from 'moment';
import isValidValue from './isValidValue.js';

const getMonthly = (d1, d2) => moment(d1).format('YYYY-MM') === moment(d2).format('YYYY-MM');
const getWeekly = (d1, d2) => moment(d1).isSame(d2, 'week');

const getDateOnlyTime = date => {
  const d = moment(date, ['DD/MMM/YYYY', moment.ISO_8601], true);
  return d.isValid() ? d.startOf('day').valueOf() : null;
};

const findDailyStartIndex = (series, selectedDate, valueName) => {
  const selectedTime = getDateOnlyTime(selectedDate);
  if (selectedTime === null) return -1;

  for (let i = series.length - 1; i >= 0; i--) {
    const rowTime = getDateOnlyTime(series[i].date);

    if (rowTime !== null && rowTime <= selectedTime && isValidValue(series[i][valueName])) {
      return i;
    }
  }

  return -1;
};

export const computeGrowthDetails = (series, valueName, selectedDate, frequency) => {
  if (!series || series.length === 0) return { value: null };

  let matchedIndex = -1;

  if (selectedDate) {
    if (frequency === 'Monthly') {
      matchedIndex = series.findIndex(e => getMonthly(e.date, selectedDate));
    } else if (frequency === 'Daily') {
      matchedIndex = findDailyStartIndex(series, selectedDate, valueName);
    } else if (frequency === 'Weekly') {
      matchedIndex = series.findIndex(e => getWeekly(e.date, selectedDate));
    }
  } else {
    matchedIndex = 0;
  }

  let startIndex = -1;
  if (matchedIndex !== -1) {
    for (let i = matchedIndex; i >= 0; i--) {
      if (isValidValue(series[i][valueName])) {
        startIndex = i;
        break;
      }
    }
  }

  let endIndex = -1;
  for (let i = series.length - 1; i >= 0; i--) {
    if (isValidValue(series[i][valueName])) {
      endIndex = i;
      break;
    }
  }

  const startRow = startIndex !== -1 ? series[startIndex] : null;
  const endRow = endIndex !== -1 ? series[endIndex] : null;
  const startValue = startRow ? Number(String(startRow[valueName]).trim()) : null;
  const endValue = endRow ? Number(String(endRow[valueName]).trim()) : null;

  const details = {
    value: null,
    matchedIndex,
    startIndex,
    endIndex,
    startRow,
    endRow,
    startValue,
    endValue
  };

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return details;
  }

  const pct = Math.round(((endValue - startValue) / startValue) * 1000) / 10;
  details.value = Number.isFinite(pct) ? pct : null;

  return details;
};

const computeGrowth = (series, valueName, selectedDate, frequency) => {
  const details = computeGrowthDetails(series, valueName, selectedDate, frequency);
  return details.value;
};

export default computeGrowth;
