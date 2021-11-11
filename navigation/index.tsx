import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { RootStackParamList } from "../utils/types";

import SearchScreen from "../screens/SearchScreen";
import WeatherDetailsScreen from "../screens/WeatherDetailsScreen";
import WeatherForecastScreen from "../screens/WeatherForecastScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />

        <Stack.Screen name="Weather Details" component={WeatherDetailsScreen} />

        <Stack.Screen
          name="Weather Forecast"
          component={WeatherForecastScreen}
        />

        <Stack.Screen name="Not Found Page" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
