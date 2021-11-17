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

// Function to get name for day
export const nameDate = (date: Date) => {
  const today = new Date();

  let name = "";
  if (date.getDate() == today.getDate()) {
    name = "Today";
  } else if (date.getDate() == today.getDate() + 1) {
    name = "Tomorrow";
  } else {
    name = days[date.getDay()];
  }

  return name;
};

// Function to get hours from given date
export const hours = (date: Date) => {
  return new Date(date).getHours();
};

// Function to get date from string
export const stringToDate = (dateString: string) => {
  let dateArr = dateString.split(/\D/);
  return new Date(
    Number(dateArr[0]),
    Number(dateArr[1]) - 1,
    Number(dateArr[2]),
    Number(dateArr[3]),
    Number(dateArr[4])
  );
};
