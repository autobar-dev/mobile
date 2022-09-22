import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 60,
  },
  dividerAbove: {
    borderTopColor: "#333",
    borderTopWidth: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    height: "100%",
  },
  iconAndLabel: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    marginRight: 18,
  },
  label: {
    fontFamily: "Outfit-Regular",
    fontSize: 18,
  },
  rightElement: {
    
  },
});