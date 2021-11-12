import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Navigation
export type RootStackParamList = {
  Search: undefined;
  "Weather Details": { city: string };
  "Weather Forecast": { city: string };
  "Not Found Page": undefined;
};
export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Search"
>;
export type WeatherDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Weather Details"
>;
export type WeatherForecastScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Weather Forecast"
>;
export type NotFoundScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Not Found Page"
>;

// Weather details
export interface WeatherData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    feels_like: number;
  };
  weather: [{ main: string; icon: string }];
  clouds: {
    all: string;
  };
}

// Forecast details
export interface WeatherForecast {
  list: [
    {
      date: Date;
      minTemp: number;
      maxTemp: number;
      clouds: number;
      windSpeed: number;
      icon: string;
      main: string;
    }
  ];
}

// API response data for forecast
export interface responseData {
  message: string;
  cod: string;
  count: number;
  list: [
    {
      id: number;
      name: string;
      dt_txt: number;
      coord: { lat: number; lon: number };
      main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
      };
      dt: number;
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      sys: {
        country: string;
      };
      rain: string;
      snow: string;
      clouds: {
        all: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
    }
  ];
}

// Weather details
export interface weatherObject {
  description: string;
  icon: string;
  id: number;
  main: string;
}
