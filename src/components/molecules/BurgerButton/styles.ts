import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    paddingRight: 20,
    paddingVertical: 10,
  },
  linesWrapper: {
    width: 22,
    height: 14,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#f8f8f8",
    borderRadius: 1,
  },
});