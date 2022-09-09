import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import { styles } from "./styles";
import { CustomTextInput } from "../../components/molecules/CustomTextInput";
import KeyIcon from "../../components/atoms/KeyIcon";
import MessageIcon from "../../components/atoms/MessageIcon";
import EyeIcon from "../../components/atoms/EyeIcon";
import EyeSlashIcon from "../../components/atoms/EyeSlashIcon";
import { CustomButton } from "../../components/molecules/CustomButton";
import { getServiceUri } from "../../utils/helpers/getServiceUrl";

const welcomeImage = require("../../../assets/images/pouring-beer-bar.png");

export default function SignInScreen({ navigation }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMeSelected, setRememberMeSelected] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState("");

  const passwordInputRef = useRef(null);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleEmailFieldSubmit = () => passwordInputRef.current.focus();
  const handleFormSubmit = async () => {
    setIsLoading(true);

    const url = `https://api.autobar.ovh/auth/signin`;

    alert(`Making request to: ${url}, with ${JSON.stringify({email, password}, null, 2)}`);
    console.log(`Making POST request to ${url}: `, { email, password, });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          include_token: true,
        }),
      });
  
      const text = await response.text();

      console.log('Response: ', text);
      alert(`Response: ${text}`);

      // const json = await response.json();
      
      // alert(JSON.stringify(json, null, 2));
      
      if(response.status === 200) {
        alert("OK!");
      }  
    } catch(e) {
      setSignInError(e.message || "Something went wrong");

      console.log("Error: ", e);
      alert(e.message);
    }
    
    setIsLoading(false);
  };

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
            <Checkbox
              value={rememberMeSelected}
              onValueChange={(newRememberMeSelection) => setRememberMeSelected(newRememberMeSelection)}
              color="#e3b04b"
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
            onPress={() => alert("Forgot password")}
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
            onPress={() => alert("Sign up")}
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

//navigation.navigate('LocalAuth');