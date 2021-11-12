import { responseData, WeatherForecast } from "./types";
import { getRoundOf } from "./math.util";

// Function to convert given response data according to the desired conditions
export const calculateForecast = (data: responseData) => {
  let tempData: WeatherForecast = {
    list: [
      {
        date: new Date(),
        minTemp: 0,
        maxTemp: 0,
        clouds: 0,
        windSpeed: 0,
        icon: "",
        main: "",
      },
    ],
  };

  let minTemp = 1000;
  let maxTemp = 0;
  let clouds = 0;
  let windSpeed = 0;
  let icon = "";
  let main = "";
  let d = 0;

  let today = new Date();
  let currentDate = today;
  let date = new Date(data.list[0].dt_txt);

  data.list.map((ele) => {
    date = new Date(ele.dt_txt);

    if (currentDate.getDate() == date.getDate()) {
      minTemp = minTemp > ele.main.temp_min ? ele.main.temp_min : minTemp;
      maxTemp = maxTemp < ele.main.temp_max ? ele.main.temp_max : maxTemp;
      clouds = clouds + ele.clouds.all;
      windSpeed = windSpeed + ele.wind.speed;

      if (date.getHours() == new Date().getHours()) {
        icon = ele.weather[0].icon;
        main = ele.weather[0].main;
      }

      d++;
    } else {
      const listEle = {
        date: currentDate,
        minTemp: getRoundOf(minTemp),
        maxTemp: getRoundOf(maxTemp),
        clouds: getRoundOf(clouds / d),
        windSpeed: getRoundOf(windSpeed / d),
        icon: icon,
        main: main,
      };

      tempData.list.push(listEle);

      currentDate = date;
      minTemp = ele.main.temp_min;
      maxTemp = ele.main.temp_max;
      clouds = ele.clouds.all;
      windSpeed = ele.wind.speed;
      d = 1;
    }
  });

  let listEle = {
    date: currentDate,
    minTemp: getRoundOf(minTemp),
    maxTemp: getRoundOf(maxTemp),
    clouds: getRoundOf(clouds / d),
    windSpeed: getRoundOf(windSpeed / d),
    icon: icon,
    main: main,
  };

  tempData.list.push(listEle);
  tempData.list.shift();

  return tempData;
};
