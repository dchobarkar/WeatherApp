import { getRoundOf } from "./math.util";
import { hours, nameDate } from "./date.util";
import {
  ForecastResponseObj,
  PredictionArrObj,
  WeatherForecastObj,
} from "./types";

// Function to convert given response data according to the desired conditions
export const calculateForecast = (data: ForecastResponseObj) => {
  let tempData: WeatherForecastObj = {
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

  const hour = today.getHours() - (today.getHours() % 3);

  data.list.map((ele) => {
    date = new Date(ele.dt_txt);

    if (currentDate.getDate() == date.getDate()) {
      minTemp = minTemp > ele.main.temp_min ? ele.main.temp_min : minTemp;
      maxTemp = maxTemp < ele.main.temp_max ? ele.main.temp_max : maxTemp;
      clouds = clouds + ele.clouds.all;
      windSpeed = windSpeed + ele.wind.speed;

      if (date.getHours() == hour) {
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

// Function to get prediction data from the api response
export const bestDayToSell = (data: ForecastResponseObj) => {
  let predictionArr: PredictionArrObj[] = [];

  // Calculate weight for each time slot
  data.list.map((ele) => {
    if (isWorkingHour(ele.dt_txt)) {
      const [uw, jw, hw] = calculateWeight(
        ele.weather[0].id,
        ele.pop,
        ele.wind.speed,
        ele.main.feels_like
      );

      predictionArr.push({ uw: uw, jw: jw, hw: hw, date: ele.dt_txt });
    }
  });

  // Calculate cumulative weight for each day
  let avgArr: PredictionArrObj[] = calculateCumWeight(predictionArr);

  // Calculate best day
  const [umbrella, jacket, hat] = calculateBestDay(avgArr);

  return { umbrella: umbrella, jacket: jacket, hat: hat };
};

// Function to check if the timing is in working hours
const isWorkingHour = (date: Date) => {
  switch (hours(date)) {
    case 9:
    case 12:
    case 15:
    case 18:
      return true;

    default:
      return false;
  }
};

// Function to calculate the weight of for umbrella, jacket and hat
const calculateWeight = (
  id: number,
  pop: number,
  speed: number,
  temp: number
) => {
  let uw = 0;
  let jw = 0;
  let hw = 0;
  let u = 0;
  let j = 0;
  let h = 0;

  // Weather Id weightage
  switch (true) {
    // Cases for thunderstorm
    case id < 300:
      u = 20;
      j = -1000;
      h = -1000;
      break;

    // Cases for drizzle
    case id < 400:
      u = 30;
      j = 20;
      h = 20;
      break;

    // Cases for rain
    case id < 600:
      u = 40;
      j = 30;
      h = 10;
      break;

    // Cases for snow
    case id < 700:
      u = -1000;
      j = 40;
      h = 30;
      break;

    // Cases for Atmosphere
    case id < 800:
      u = -1000;
      j = -1000;
      h = -1000;
      break;

    // Cases for clear
    case id == 800:
      u = 0;
      j = 10;
      h = 30;
      break;

    // Cases for clouds
    case id < 900:
      u = 10;
      j = 0;
      h = 0;
      break;
    default:
  }

  uw = uw + u;
  jw = jw + j;
  hw = hw + h;
  u = j = h = 0;

  // Probability of Precipitation weightage
  switch (true) {
    case pop <= 0.1:
      u = 10;
      break;
    case pop <= 0.2:
      u = 20;
      break;
    case pop <= 0.3:
      u = 30;
      break;
    case pop <= 0.4:
      u = 40;
      break;
    case pop <= 0.5:
      u = 50;
      break;
    case pop <= 0.6:
      u = 60;
      break;
    case pop <= 0.7:
      u = 70;
      break;
    case pop <= 0.8:
      u = 80;
      break;
    case pop <= 0.9:
      u = 90;
      break;
    case pop <= 1:
      u = 100;
      break;

    default:
  }
  uw = uw + u;
  u = 0;

  // Wind speed weightage
  switch (true) {
    case speed <= 0.4:
      u = 5;
      h = 5;
      break;
    case speed <= 1.3:
      u = 4;
      h = 4;
      break;
    case speed <= 3.1:
      u = 3;
      h = 3;
      break;
    case speed <= 5.7:
      u = 2;
      h = 2;
      break;
    case speed <= 8:
      u = 1;
      h = 1;
      break;
    case speed <= 10.7:
      u = 0;
      h = 0;
      break;
    case speed <= 13.9:
      u = -1000;
      h = -1000;
      break;
    case speed > 13.9:
      u = -1000;
      h = -1000;
      break;

    default:
  }
  uw = uw + u;
  hw = hw + h;
  u = h = 0;

  // Temperature weightage
  switch (true) {
    case temp < 0:
      j = 80;
      h = 50;
      break;
    case temp < 5:
      j = 70;
      h = 40;
      break;
    case temp < 10:
      j = 60;
      h = 30;
      break;
    case temp < 15:
      j = 50;
      h = 20;
      break;
    case temp < 20:
      j = 40;
      h = 10;
      break;
    case temp < 25:
      j = 30;
      h = 0;
      break;
    case temp < 30:
      j = 20;
      h = 10;
      break;
    case temp < 35:
      j = 10;
      h = 20;
      break;
    case temp < 40:
      j = 0;
      h = 30;
      break;
    case temp <= 45:
      j = -1000;
      h = 40;
      break;
    case temp > 45:
      j = -1000;
      h = 50;
      break;

    default:
  }

  jw = jw + j;
  hw = hw + h;

  return [uw, jw, hw];
};

// Function to calculate cumulative weight for each day
const calculateCumWeight = (predictionArr: PredictionArrObj[]) => {
  let avgArr = [];

  let today = new Date(predictionArr[0].date);
  let uw = 0;
  let jw = 0;
  let hw = 0;
  let d = 0;
  predictionArr.map((ele) => {
    let date = new Date(ele.date);
    if (date.getDate() == today.getDate()) {
      uw = uw + ele.uw;
      jw = jw + ele.jw;
      hw = hw + ele.hw;
      d++;
    } else {
      avgArr.push({
        uw: getRoundOf(uw / d),
        jw: getRoundOf(jw / d),
        hw: getRoundOf(hw / d),
        date: today,
      });
      uw = ele.uw;
      jw = ele.jw;
      hw = ele.hw;
      d = 1;
      today = date;
    }
  });
  avgArr.push({
    uw: getRoundOf(uw / d),
    jw: getRoundOf(jw / d),
    hw: getRoundOf(hw / d),
    date: new Date(predictionArr[predictionArr.length - 1].date),
  });

  return avgArr;
};

// Function to calculate best day for sell
const calculateBestDay = (avgArr: PredictionArrObj[]) => {
  let uDate = avgArr[0].date;
  let uMax = avgArr[0].uw;
  let jDate = avgArr[0].date;
  let jMax = avgArr[0].jw;
  let hat: String[] = [];

  avgArr.map((ele) => {
    if (uMax < ele.uw) {
      uDate = ele.date;
      uMax = ele.uw;
    }

    if (jMax < ele.jw) {
      jDate = ele.date;
      jMax = ele.jw;
    }

    if (ele.hw > 20) {
      hat.push(nameDate(new Date(ele.date)));
    }
  });

  if (hat.length === 0) {
    hat.push("None");
  }

  return [nameDate(new Date(uDate)), nameDate(new Date(jDate)), hat];
};
