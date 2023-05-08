import * as React from "react";
import { View, Text, TextInput, SafeAreaView, Button, ToastAndroid } from "react-native";
import Checkbox from "expo-checkbox";
import { AuthController } from "../../controllers/AuthController";
import { SimpleError } from "../../types/SimpleError";
import * as SecureStore from "expo-secure-store";
import { SessionContext } from "../../contexts/SessionContext";

export function LoginScreen() {
  const { setSession } = React.useContext(SessionContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const submitLogIn = React.useCallback(async () => {
    setLoading(true);

    try {
      const session = await AuthController.logIn(email, password, rememberMe);
      await SecureStore.setItemAsync("session", session);
      setSession(session);
    } catch (se) {
      ToastAndroid.show((se as SimpleError).displayMessage, ToastAndroid.SHORT);
    }

    setLoading(false);
  }, [email, password, rememberMe]);

  return (
    <SafeAreaView>
      <TextInput
        placeholder="E-mail..."
        value={email}
        onChangeText={setEmail}
        style={{
          fontSize: 18,
          padding: 10,
        }}
      />
      <TextInput
        placeholder="Password..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{
          fontSize: 18,
          padding: 10,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <Checkbox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text
          style={{
            marginLeft: 10,
          }}
        >Remember me for 30 days</Text>
      </View>
      <Button
        title={loading ? "Loading" : "Log in"}
        onPress={submitLogIn}
        disabled={loading}
      />
    </SafeAreaView>
  );
}

