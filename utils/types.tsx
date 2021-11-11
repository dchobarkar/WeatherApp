import { NativeStackScreenProps } from "@react-navigation/native-stack";

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

export interface WeatherData {
  main: { temp: number; temp_min: number; temp_max: number };
  weather: [{ main: string }];
}

export interface WeatherForecast {
  list: [{ date: Date; minTemp: number; maxTemp: number }];
}

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
