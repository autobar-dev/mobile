import * as React from "react";
import { View, Text, TextInput, Button, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";

export function LoginScreen() {
  const { providers } = React.useContext(AppContext);
  const { setTokens } = React.useContext(TokensContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const submitLogIn = React.useCallback(async () => {
    setLoading(true);

    try {
      const tokens = await providers.auth.login(email, password, rememberMe);
      setTokens(tokens);
    } catch (e) {
      ToastAndroid.show("Failed to log in", ToastAndroid.SHORT);
      console.log("Login error", e);
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
        >Remember me</Text>
      </View>
      <Button
        title={loading ? "Loading" : "Log in"}
        onPress={submitLogIn}
        disabled={loading}
      />
    </SafeAreaView>
  );
}

