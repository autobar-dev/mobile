import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 199,
    backgroundColor: "#181818f4"
  },
  container: {
    width: "80%",
    alignItems: "center",
  },
  cancelPouringButton: {
    width: "100%"
  },
  imageWrapper: {
    aspectRatio: 1,
    width: "90%",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  beerImage: {
    width: "100%",
    height: "100%",
  },
  beerInfoWrapper: {
    marginBottom: 40,
  },
  beerName: {
    color: "#f3f3f3",
    fontSize: 28,
    fontFamily: "Outfit-SemiBold",
    marginBottom: 10,
  },
  beerDescription: {
    color: "#f3f3f3",
    fontSize: 18,
    fontFamily: "Outfit-Light",
    marginBottom: 10,
  },
  closeModalButtonWrapper: {
    marginTop: 30,
  },
});