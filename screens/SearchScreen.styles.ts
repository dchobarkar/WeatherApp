import { StyleSheet } from "react-native";

export const root = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EB489",
  },

  header: {
    marginBottom: 100,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FEFEFF",
  },

  textInput: {
    margin: 10,
    fontSize: 17,
    textAlign: "center",
    color: "#FEFEFF",
  },

  dropdownList: {
    marginBottom: 10,
  },

  dropdownMenu: {
    paddingBottom: 5,
    textAlign: "center",
    color: "#FEFEFE",
  },
});
