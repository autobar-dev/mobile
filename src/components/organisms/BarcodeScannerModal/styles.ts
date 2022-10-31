import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 199,
    backgroundColor: "#181818f4"
  },
  cameraWrapper: {
    aspectRatio: 1,
    width: "80%",
    borderRadius:  20,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  instructionText: {
    paddingHorizontal: 40,
    textAlign: "center",
    marginTop: 32,
    fontFamily: "Outfit-Regular",
    fontSize: 20,
    color: "#f8f8f8",
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