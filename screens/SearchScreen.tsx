import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { OPEN_WEATHER_API_KEY } from "@env";

import { CityListObj, SearchScreenProps } from "../utils/types";
import { root } from "./SearchScreen.styles";
import { getCities } from "../utils/search.util";

function SearchScreen({ navigation }: SearchScreenProps) {
  const [cityInput, setCityInput] = useState<string>("");
  const [cityList, setCityList] = useState<CityListObj[]>([]);
  const [cityObj, setCityObj] = useState<CityListObj>({
    name: "",
    country: "",
    lat: 0,
    lon: 0,
    id: 0,
  });

  // Function to get city name autocomplete
  const geoCoding = async (cityName: string) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${OPEN_WEATHER_API_KEY}`
      );
      const json = await response.json();
      setCityList(getCities(json));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the selection of a city from given co-ordinates
  const selectedCityHandler = (city: CityListObj) => {
    setCityObj(city);
    setCityList([]);
  };

  return (
    <View style={root.container}>
      <Text style={root.header}>Welcome to my Weather App.</Text>

      <TextInput
        style={root.textInput}
        autoCapitalize="words"
        placeholder="Enter your city"
        onChangeText={(input) => geoCoding(input)}
        defaultValue={cityInput}
      />

      <View style={root.dropdownList}>
        {cityList.map((city, index) => (
          <TouchableHighlight
            key={city.id}
            onPress={() => selectedCityHandler(city)}
          >
            <Text style={root.dropdownMenu}>
              {`${city.name} - ${city.country} (${city.lon} , ${city.lat})`}
            </Text>
          </TouchableHighlight>
        ))}
      </View>

      <Button
        title="Get weather"
        disabled={!cityObj?.name}
        color="#E7D177"
        onPress={() =>
          navigation.navigate("Weather Details", {
            name: cityObj.name,
            lon: cityObj.lon,
            lat: cityObj.lat,
            country: cityObj.country,
            id: cityObj.id,
          })
        }
      />
    </View>
  );
}

export default SearchScreen;
