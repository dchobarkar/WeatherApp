import { isRainObj } from "./types";

// Function to check if there is a condition for rain
export const checkForRain = (data: isRainObj[]) => {
  let isRain: boolean = false;
  let title = "";
  let des = "";

  data.map((ele) => {
    switch (ele.id) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 511:
      case 520:
      case 521:
      case 522:
      case 531:
        isRain = true;
        title = ele.main;
        des = ele.description;
        break;

      default:
    }
  });

  return {
    isRain: isRain,
    title: title,
    des: des,
  };
};
