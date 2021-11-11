import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import { SearchScreenProps } from "../utils/types";
import { root } from "./SearchScreen.styles";

function SearchScreen({ navigation }: SearchScreenProps) {
  const [cityInput, setCityInput] = useState<string>("");

  return (
    <View style={root.container}>
      <Text style={root.header}>Welcome to my Weather App.</Text>

      <TextInput
        style={root.textInput}
        autoCapitalize="words"
        placeholder="Enter your city"
        onChangeText={(input) => setCityInput(input)}
        defaultValue={cityInput}
      />

      <Button
        title="Get weather"
        disabled={!cityInput}
        color="#E7D177"
        onPress={() =>
          navigation.navigate("Weather Details", { city: cityInput })
        }
      />
    </View>
  );
}

export default SearchScreen;
