import { getRoundOf } from "./math.util";
import { CityListObj, GeolocationResponseObj } from "./types";

export const getCities = (data: GeolocationResponseObj[]) => {
  let cityList: CityListObj[] = [];

  if (!Array.isArray(data)) {
    return cityList;
  }

  data.map((city, index) => {
    cityList.push({
      id: index + 1,
      name: city.name,
      country: city.country,
      lat: getRoundOf(city.lat),
      lon: getRoundOf(city.lon),
    });
  });

  return cityList;
};
