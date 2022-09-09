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
  welcomeImageWrapper: {
    flex: 1,
    width: "100%",
  },
  welcomeImageGradient: {
    width: "100%",
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  welcomeImage: {
    height: "100%",
    width: "100%",
    backgroundColor: '#e3b04b',
  },
  formContainer: {
    height: "auto",
    width: "100%",
    paddingLeft: 25,
    paddingRight: 25,
  },
  formTitle: {
    fontSize: 36,
    fontFamily: "Outfit-SemiBold",
    color: "#f8f8f8",
    marginTop: 40,
  },
  formSubheading: {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    color: "#a1a1a1",
    marginTop: 10,
  },
  emailInput: {
    marginTop: 40,
  },
  passwordInput: {
    marginTop: 30,
  },
  rememberMeAndForgotPasswordWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 8,
    marginTop: 25,
  },
  rememberMeWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  rememberMeLabel: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: "#a1a1a1",
  },
  forgotPasswordLabel: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 14,
    color: "#a1a1a1",
  },
  signInButton: {
    marginTop: 30,
  },
  signUpWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  signUpQuestion: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: "#a1a1a1",
  },
  signUpLabel: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 14,
    color: "#a1a1a1",
    marginLeft: 4,
  },
});