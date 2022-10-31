import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, Button, Image, Keyboard, TouchableWithoutFeedback, TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from "@react-native-community/checkbox";
import { styles } from "./styles";
import { CustomTextInput } from "../../components/molecules/CustomTextInput";
import KeyIcon from "../../components/atoms/KeyIcon";
import MessageIcon from "../../components/atoms/MessageIcon";
import EyeIcon from "../../components/atoms/EyeIcon";
import EyeSlashIcon from "../../components/atoms/EyeSlashIcon";
import { CustomButton } from "../../components/molecules/CustomButton";
import { setTokensToEncryptedStorage } from "../../utils/setTokensToEncryptedStorage";
import UserContext from "../../contexts/UserContext";
import { getServiceUri } from "../../utils/getServiceUri";

const welcomeImage = require("../../../assets/images/pouring-beer-bar.png");

export default function SignInScreen({ navigation }: any) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMeSelected, setRememberMeSelected] = useState(false);
  
  const { user, flushUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState("");

  const passwordInputRef = useRef<TextInput | undefined>(undefined);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleEmailFieldSubmit = () => passwordInputRef.current!.focus();
  const handleFormSubmit = async () => {
    setSignInError("");
    setIsLoading(true);

    const url = `${getServiceUri()}/auth/signin`;

    console.log(`Making POST request to ${url}: `, { email, password, });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          include_token: true,
        }),
      });

      const json = await response.json();
      console.log("signIn response", { status: response.status, ...json });
      
      if(response.status === 200) {
        await setTokensToEncryptedStorage({
          accessToken: json.accessToken,
        });

        try {
          await flushUser();
        } catch(e: any) {
          console.log("Error while flushing user", e);
          setSignInError(e.toString() || "Something went wrong");
        }

        setIsLoading(false);

        navigation.navigate("Map");
      } else if(response.status === 400) {
        setSignInError(json.message);
      } else if(response.status === 401) {
        setSignInError("Invalid email or password");
      } else {
        setSignInError("Something went wrong");
      }
    } catch(e: any) {
      setSignInError(e.message || "Something went wrong");
      console.log("Error: ", e);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if(user) {
      console.log("User signed in. Navigating to LocalAuth...");

      setEmail("");
      setPassword("");
      setIsPasswordVisible(false);

      navigation.navigate("LocalAuth");
    } else {
      console.log("User not signed in. Staying in SignIn...");
    }
  }, [user]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.root}>
      <View
        style={[
          {
            display: keyboardVisible ? "none" : "flex",
          },
          styles.welcomeImageWrapper,
        ]}
      >
        <LinearGradient
          colors={["#181818FF", "#00000000"]}
          style={styles.welcomeImageGradient}
        />
        <Image
          source={welcomeImage}
          style={styles.welcomeImage}
        />
      </View>
      
      <View
        style={styles.formContainer}
      >
        <Text style={[
          styles.formTitle,
          (keyboardVisible) && { marginTop: 70 },
        ]}>Welcome</Text>
        <Text style={styles.formSubheading}>Please sign in to continue</Text>
        <CustomTextInput
          style={styles.emailInput}
          label="Email"
          type="email"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={handleEmailFieldSubmit}
          error={!!signInError}
          icon={
            <MessageIcon
              color="#f8f8f8"
              width={24}
            />
          }
        />
        <CustomTextInput
          style={styles.passwordInput}
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          returnKeyType="done"
          innerRef={passwordInputRef}
          error={signInError}
          onSubmitEditing={handleFormSubmit}
          value={password}
          onChangeText={setPassword}
          icon={
            <KeyIcon
              color="#f8f8f8"
              width={24}
            />
          }
          iconRight={
            <TouchableWithoutFeedback
              onPress={togglePasswordVisibility}
            >
              <View>
                {
                  isPasswordVisible ?
                    <EyeSlashIcon
                      color="#f8f8f8"
                      width={22}
                    />
                  :
                    <EyeIcon
                      color="#f8f8f8"
                      width={22}
                    />
                }
              </View>
            </TouchableWithoutFeedback>
          }
        />
        <View style={styles.rememberMeAndForgotPasswordWrapper}>
          <View style={styles.rememberMeWrapper}>
            <CheckBox
              value={rememberMeSelected}
              onValueChange={(newRememberMeSelection) => setRememberMeSelected(newRememberMeSelection)}
              // color="#e3b04b"
              style={styles.rememberMeCheckbox}
            />
            <TouchableWithoutFeedback
              onPress={() => setRememberMeSelected(!rememberMeSelected)}
            >
              <View>
                <Text style={styles.rememberMeLabel}>Remember me</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback
            onPress={() => console.log("Forgot password")}
          >
            <View>
              <Text style={styles.forgotPasswordLabel}>Forgot your password?</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <CustomButton
          label="Sign in"
          style={styles.signInButton}
          onPress={handleFormSubmit}
          disabled={isLoading}
          loader={isLoading}
        />
        <View style={styles.signUpWrapper}>
          <Text style={styles.signUpQuestion}>Don't have an account yet?</Text>
          <TouchableWithoutFeedback
            onPress={() => console.log("Sign up")}
          >
            <View>
              <Text style={styles.signUpLabel}>Sign up</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}