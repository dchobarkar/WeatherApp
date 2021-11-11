import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { OPEN_WEATHER_API_KEY } from "@env";

import { WeatherForecast, WeatherForecastScreenProps } from "../utils/types";
import LoaderScreen from "./LoaderScreen";
import { calculateForecast } from "../utils/forecast.util";
import { decorateDate } from "../utils/date.util";
import { root } from "./WeatherForecastScreen.styles";

function WeatherForecastScreen({
  route,
  navigation,
}: WeatherForecastScreenProps) {
  const { city } = route.params;

  const [forecastData, setForecastData] = useState<WeatherForecast>({
    list: [{ date: new Date(), minTemp: 0, maxTemp: 0 }],
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
          <View key={ele.minTemp} style={root.row}>
            <Text>{decorateDate(ele.date)}</Text>
            <Text>{ele.minTemp}&#8451;</Text>
            <Text>{ele.maxTemp}&#8451;</Text>
          </View>
        ))}
      </View>
    </React.Fragment>
  );

  return <View style={root.container}>{page}</View>;
}

export default WeatherForecastScreen;
