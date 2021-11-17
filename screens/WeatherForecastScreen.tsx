import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { OPEN_WEATHER_API_KEY } from "@env";

import {
  PredictionDataObj,
  WeatherForecastObj,
  WeatherForecastScreenProps,
} from "../utils/types";
import { bestDayToSell, calculateForecast } from "../utils/forecast.util";
import { decorateDate, nameDate } from "../utils/date.util";

import LoaderScreen from "./LoaderScreen";
import { root } from "./WeatherForecastScreen.styles";
import { getRanId } from "../utils/math.util";

function WeatherForecastScreen({
  route,
  navigation,
}: WeatherForecastScreenProps) {
  const { name, country, lat, lon, id } = route.params;

  const [forecastData, setForecastData] = useState<WeatherForecastObj>({
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
  });
  const [PredictionDataObj, setPredictionData] = useState<PredictionDataObj>({
    umbrella: "",
    jacket: "",
    hat: [""],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the weather forecast information
  const getForecast = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      );
      const json = await response.json();

      setForecastData(calculateForecast(json));
      setPredictionData(bestDayToSell(json));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForecast(lat, lon);
  }, []);

  const page = isLoading ? (
    <LoaderScreen />
  ) : (
    <React.Fragment>
      <Text style={root.header}>5-day forecast</Text>

      <Text style={root.cityName}>{name}</Text>

      <View style={root.forecastTable}>
        {forecastData.list.map((ele) => (
          <View key={getRanId()} style={root.row}>
            <View style={root.dayBox}>
              <Text style={root.name}>{nameDate(ele.date)}</Text>

              <Text style={root.date}>{decorateDate(ele.date)}</Text>
            </View>

            <Text style={root.minMax}>
              {ele.maxTemp}&#176;/{ele.minTemp}&#176;
            </Text>

            <Image
              style={root.image}
              source={{
                uri: `https://openweathermap.org/img/wn/${ele.icon}.png`,
              }}
            />
            <Text style={root.main}>{ele.main}</Text>

            <View style={root.otherBox}>
              <Text style={root.clouds}>{ele.clouds}%</Text>

              <Text style={root.windSpeed}>{ele.windSpeed}m/s</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={root.predictionBox}>
        <Text style={root.umbrella}>
          Best day to sell an umbrella is {PredictionDataObj.umbrella}
        </Text>

        <Text style={root.jacket}>
          Best day to sell a jacket is {PredictionDataObj.jacket}
        </Text>

        <Text style={root.hat}>Wearing hat is recommended on </Text>

        <Text style={root.hat}>
          {PredictionDataObj.hat.map((day) => `${day}, `)}
        </Text>
      </View>
    </React.Fragment>
  );

  return <View style={root.container}>{page}</View>;
}

export default WeatherForecastScreen;
