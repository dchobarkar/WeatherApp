import { StyleSheet } from "react-native";

export const root = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EB489",
  },

  detailsContainer: {
    marginBottom: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  cityName: {
    textTransform: "uppercase",
    fontSize: 60,
    textAlign: "center",
    color: "#FEFEFE",
  },

  date: {
    padding: 10,
    fontSize: 12,
    color: "#FEFEFE",
  },

  currentTemp: {
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 80,
    color: "#FEFEFE",
  },

  weather: {
    padding: 2,
    fontSize: 18,
    color: "#FEFEFE",
  },

  minMax: {
    padding: 2,
    fontSize: 18,
    color: "#FEFEFE",
  },
});
