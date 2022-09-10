import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 80,
    position: "absolute",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  itemsWrapper: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -10,
  },
  logo: {
    height: 40,
    width: 100,
  },
  scanBarcodeWrapper: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
});