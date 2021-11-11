import { responseData, WeatherForecast } from "./types";
import { getRoundOf } from "./math.util";

// Function to convert given response data according to the desired conditions
export const calculateForecast = (data: responseData) => {
  let tempData: WeatherForecast = {
    list: [{ date: new Date(), minTemp: 0, maxTemp: 0 }],
  };

  let i = 1;

  let minTemp = 1000;
  let maxTemp = 0;

  let today = new Date();
  let currentDate = today;
  let date = new Date(data.list[0].dt_txt);

  data.list.map((ele) => {
    date = new Date(ele.dt_txt);

    if (currentDate.getDate() == date.getDate()) {
      minTemp = minTemp > ele.main.temp_min ? ele.main.temp_min : minTemp;
      maxTemp = maxTemp < ele.main.temp_max ? ele.main.temp_max : maxTemp;
    } else {
      const listEle = {
        date: currentDate,
        minTemp: getRoundOf(minTemp),
        maxTemp: getRoundOf(maxTemp),
      };
      tempData.list.push(listEle);
      currentDate = date;
      minTemp = ele.main.temp_min;
      maxTemp = ele.main.temp_max;
    }
  });

  let listEle = {
    date: currentDate,
    minTemp: getRoundOf(minTemp),
    maxTemp: getRoundOf(maxTemp),
  };

  tempData.list.push(listEle);
  tempData.list.shift();
  tempData.list.shift();

  return tempData;
};
