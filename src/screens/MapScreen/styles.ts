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
  screenLabel: {
    marginTop: 100,
    fontSize: 24,
    fontFamily: "Outfit-SemiBold",
    color: "#f8f8f8",
  },
  textMonospace: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "monospace",
    color: "#f8f8f8",
  },
});