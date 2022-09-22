import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 199,
    backgroundColor: "#181818f4"
  },
  profileInfo: {
    marginBottom: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  profileInfoName: {
    marginTop: 24,
    fontFamily: "Outfit-Medium",
    fontSize: 28,
    color: "#f8f8f8",
  },
  profileInfoBalance: {
    marginTop: 14,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: "#e3b04b"
  },
  menuContainer: {
    width: "80%",
    height: "auto",
    borderRadius: 20,
    backgroundColor: "#181818",
    borderColor: "#333",
    borderWidth: 1,
    paddingVertical: 8,
  },
  closeModalButtonWrapper: {
    marginTop: 50,
  },
});