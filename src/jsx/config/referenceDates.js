const referenceDates = [
  { date: '2019-01-01', title: 'Beginning of pre-COVID year' },
  { date: '2020-03-11', title: 'WHO declares COVID-19 Pandemic' },
  { date: '2022-02-24', title: 'Onset War in Ukraine' },
  { date: '2023-05-05', title: 'WHO declares end of COVID-19 pandemic' },
  { date: '2023-10-07', title: 'Onset Israel-Palestine conflict' },
  { date: '2026-02-28', title: 'Start of military escalation in the Middle East' },
];

const formatDateLabel = (date) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(date));

export const referenceDatePresets = referenceDates.map((item) => ({
  ...item,
  label: formatDateLabel(item.date),
}));

export const datePickerHolidays = referenceDates.map(({ date, title }) => ({
  date,
  holidayName: title,
}));

export default referenceDates;
