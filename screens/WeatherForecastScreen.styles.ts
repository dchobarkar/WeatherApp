import { StyleSheet } from "react-native";

export const root = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3EB489",
  },

  header: {
    fontSize: 20,
    color: "#FEFEFE",
  },

  cityName: {
    fontSize: 15,
    color: "#FEFEFE",
  },

  forecastTable: {
    width: "80%",
    height: "60%",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-evenly",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  row: {
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
