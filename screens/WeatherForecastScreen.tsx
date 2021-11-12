import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { OPEN_WEATHER_API_KEY } from "@env";

import { WeatherForecast, WeatherForecastScreenProps } from "../utils/types";
import { calculateForecast } from "../utils/forecast.util";
import { decorateDate, nameDate } from "../utils/date.util";

import LoaderScreen from "./LoaderScreen";
import { root } from "./WeatherForecastScreen.styles";

function WeatherForecastScreen({
  route,
  navigation,
}: WeatherForecastScreenProps) {
  const { city } = route.params;

  const [forecastData, setForecastData] = useState<WeatherForecast>({
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
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the weather forecast information
  const getForecast = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      );

      const json = await response.json();
      const data = calculateForecast(json);

      setForecastData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForecast(city);
  }, []);

  const page = isLoading ? (
    <LoaderScreen />
  ) : (
    <React.Fragment>
      <Text style={root.header}>5-day forecast</Text>

      <Text style={root.cityName}>{city}</Text>

      <View style={root.forecastTable}>
        {forecastData.list.map((ele) => (
          <View key={ele.minTemp + ele.maxTemp} style={root.row}>
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
    </React.Fragment>
  );

  return <View style={root.container}>{page}</View>;
}

export default WeatherForecastScreen;
