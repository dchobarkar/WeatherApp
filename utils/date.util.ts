// Name of day in a week
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// Name of month in a year
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Function to get the name of the day
export const getWeekDay = () => {
  const date = new Date();
  return days[date.getDay()];
};

// Function to get the name of the month
export const getMonthName = () => {
  const date = new Date();
  return months[date.getMonth()];
};

// Function to get date in dd/mm/yyyy format
export const decorateDate = (date: Date) => {
  return `${months[date.getMonth()]} ${date.getDate()}`;
};
