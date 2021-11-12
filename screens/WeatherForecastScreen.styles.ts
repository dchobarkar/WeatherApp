import { StyleSheet } from "react-native";

export const root = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3EB489",
  },

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    color: "#FEFEFE",
  },

  cityName: {
    paddingBottom: 10,
    fontSize: 15,
    color: "#FEFEFE",
  },

  forecastTable: {
    width: "80%",
    height: "60%",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  dayBox: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 13,
    color: "#FEFEFE",
  },

  date: {
    fontSize: 10,
    color: "#FEFEFE",
  },

  minMax: {
    width: "15%",
    fontSize: 13,
    color: "#FEFEFE",
  },

  image: {
    height: 25,
    width: 25,
  },

  main: {
    width: "15%",
    fontSize: 13,
    textAlign: "center",
    color: "#FEFEFE",
  },

  otherBox: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  clouds: {
    fontSize: 10,
    color: "#FEFEFE",
  },

  windSpeed: {
    fontSize: 10,
    color: "#FEFEFE",
  },
});
