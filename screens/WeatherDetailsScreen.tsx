import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { OPEN_WEATHER_API_KEY } from "@env";

import {
  CityListObj,
  WeatherDetailsObj,
  WeatherDetailsScreenProps,
} from "../utils/types";
import { checkForRain } from "../utils/details.util";
import sendPushNotification from "../utils/pushNotification.util";
import { getMonthName, getWeekDay } from "../utils/date.util";
import { getRoundOf } from "../utils/math.util";

import LoaderScreen from "./LoaderScreen";
import { root } from "./WeatherDetailsScreen.styles";

function WeatherDetailsScreen({
  route,
  navigation,
}: WeatherDetailsScreenProps) {
  const { name, country, id, lat, lon } = route.params;

  const [WeatherDetailsObj, setWeatherDetailsObj] = useState<WeatherDetailsObj>(
    {
      main: { temp: 0, temp_min: 0, temp_max: 0, pressure: 0, feels_like: 0 },
      weather: [{ main: " ", icon: "" }],
      clouds: { all: " " },
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the weather information
  const getWeather = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      );
      const json = await response.json();

      // Check if there is any rainy condition
      const { isRain, title, des } = checkForRain(json.weather);

      if (isRain) {
        sendPushNotification(title, des);
      }

      setWeatherDetailsObj(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather(lat, lon);
  }, []);

  const page = isLoading ? (
    <LoaderScreen />
  ) : (
    <React.Fragment>
      <View style={root.detailsContainer}>
        <Text style={root.cityName}>{name}</Text>

        <Text style={root.pressure}>
          {WeatherDetailsObj.main.pressure} &#13169;
        </Text>

        <Text style={root.date}>
          {`${getWeekDay()},  ${getMonthName()} ${new Date().getDate()}, ${new Date().getFullYear()}`}
        </Text>

        <Image
          style={root.image}
          source={{
            uri: `https://openweathermap.org/img/wn/${WeatherDetailsObj.weather[0].icon}.png`,
          }}
        />

        <Text style={root.clouds}>{WeatherDetailsObj.clouds.all}%</Text>

        <Text style={root.weather}>{WeatherDetailsObj.weather[0].main}</Text>

        <Text style={root.currentTemp}>
          {getRoundOf(WeatherDetailsObj.main.temp)}&#8451;
        </Text>

        <Text style={root.feelsLike}>
          Feels like : {getRoundOf(WeatherDetailsObj.main.feels_like)}&#8451;
        </Text>

        <Text>---------------------------------------------------------</Text>

        <Text style={root.minMax}>
          {getRoundOf(WeatherDetailsObj.main.temp_min)}&#8451; /{" "}
          {getRoundOf(WeatherDetailsObj.main.temp_max)}&#8451;
        </Text>
      </View>

      <Button
        title="5 Day forecast"
        color="#E7D177"
        onPress={() =>
          navigation.navigate("Weather Forecast", {
            name: name,
            country: country,
            id: id,
            lon: lon,
            lat: lat,
          })
        }
      />
    </React.Fragment>
  );

  return <View style={root.container}>{page}</View>;
}

export default WeatherDetailsScreen;
