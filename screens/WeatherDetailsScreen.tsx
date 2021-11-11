import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { OPEN_WEATHER_API_KEY } from "@env";

import { WeatherData, WeatherDetailsScreenProps } from "../utils/types";
import LoaderScreen from "./LoaderScreen";
import { getMonthName, getWeekDay } from "../utils/date.util";
import { getRoundOf } from "../utils/math.util";
import { root } from "./WeatherDetailsScreen.styles";

function WeatherDetailsScreen({
  route,
  navigation,
}: WeatherDetailsScreenProps) {
  const { city } = route.params;

  const [weatherData, setWeatherData] = useState<WeatherData>({
    main: { temp: 0, temp_min: 0, temp_max: 0 },
    weather: [{ main: " " }],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the weather information
  const getWeather = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      );
      const json = await response.json();
      setWeatherData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  const page = isLoading ? (
    <LoaderScreen />
  ) : (
    <React.Fragment>
      <View style={root.detailsContainer}>
        <Text style={root.cityName}>{city}</Text>

        <Text style={root.date}>
          {`${getWeekDay()},  ${getMonthName()} ${new Date().getDate()}, ${new Date().getFullYear()}`}
        </Text>
        <Text style={root.currentTemp}>
          {getRoundOf(weatherData.main.temp)}&#8451;
        </Text>
        <Text>---------------------------------------------------------</Text>
        <Text style={root.weather}>{weatherData.weather[0].main}</Text>
        <Text style={root.minMax}>
          {getRoundOf(weatherData.main.temp_min)}&#8451; /{" "}
          {getRoundOf(weatherData.main.temp_max)}&#8451;
        </Text>
      </View>

      <Button
        title="5 Day forecast"
        color="#E7D177"
        onPress={() => navigation.navigate("Weather Forecast", { city: city })}
      />
    </React.Fragment>
  );

  return <View style={root.container}>{page}</View>;
}

export default WeatherDetailsScreen;
