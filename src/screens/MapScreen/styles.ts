import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818',
  },
  stationsLoadingIndicator: {
    position: "absolute",
    right: 20,
    top: 65,
    zIndex: 99,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});