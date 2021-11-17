import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Navigation
export type RootStackParamList = {
  Search: undefined;
  "Weather Details": {
    name: string;
    country: string;
    lon: number;
    lat: number;
    id: number;
  };
  "Weather Forecast": {
    name: string;
    country: string;
    lon: number;
    lat: number;
    id: number;
  };
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
export interface WeatherDetailsObj {
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
export interface WeatherForecastObj {
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
export interface ForecastResponseObj {
  message: string;
  cod: string;
  count: number;
  list: [
    {
      id: number;
      name: string;
      dt_txt: string;
      coord: { lat: number; lon: number };
      main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
      };
      dt: number;
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      sys: {
        pod: string;
      };
      pop: number;
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

// Is rain object
export interface isRainObj {
  description: string;
  icon: string;
  id: number;
  main: string;
}

// Prediction data
export interface PredictionDataObj {
  umbrella: string;
  jacket: string;
  hat: Array<string>;
}

// Prediction Array
export interface PredictionArrObj {
  uw: number;
  jw: number;
  hw: number;
  date: Date;
}

// Geolocation api response
export interface GeolocationResponseObj {
  name: string;
  local_names: {
    af: string;
    ar: string;
    ascii: string;
    az: string;
    bg: string;
    ca: string;
    da: string;
    de: string;
    el: string;
    en: string;
    eu: string;
    fa: string;
    feature_name: string;
    fi: string;
    fr: string;
    gl: string;
    he: string;
    hi: string;
    hr: string;
    hu: string;
    id: string;
    it: string;
    ja: string;
    la: string;
    lt: string;
    mk: string;
    nl: string;
    no: string;
    pl: string;
    pt: string;
    ro: string;
    ru: string;
    sk: string;
    sl: string;
    sr: string;
    th: string;
    tr: string;
    vi: string;
    zu: string;
  };
  lat: number;
  lon: number;
  country: string;
}

// Citylist array
export interface CityListObj {
  name: string;
  country: string;
  lon: number;
  lat: number;
  id: number;
}
