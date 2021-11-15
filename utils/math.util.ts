// Function to round of given value up to 1 decimal point
export const getRoundOf = (num: number) => {
  return Math.round(num * 10) / 10;
};

// Function to get the random id
export const getRanId = () => {
  return Math.floor(Math.random() * 100);
};
