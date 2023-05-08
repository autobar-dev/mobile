import * as React from "react";
import { LoginScreen } from "./components/screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, StackActions, useNavigation, useNavigationContainerRef } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { SessionContext } from "./contexts/SessionContext";
import { AuthController } from "./controllers/AuthController";
import { ToastAndroid } from "react-native";
import { MainScreen } from "./components/screens/MainScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();

  const [session, setSession] = React.useState<string | undefined>(undefined);
  const [accountEmail, setAccountEmail] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    SecureStore.getItemAsync("session").then(sessionFromSecureStore => {
      console.log(`Session from secure store: ${sessionFromSecureStore}`);

      if (sessionFromSecureStore) {
        setSession(sessionFromSecureStore);
      }
    });
  }, []);

  React.useEffect(() => {
    AuthController.verifySession(session).then(email => {
      console.log(`Verifying session: ${session}`);
      console.log(`Account associated with session: ${email}`);

      if (email) {
        setAccountEmail(email);

        navigationRef.resetRoot({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        SecureStore.deleteItemAsync("session");
        ToastAndroid.show("session has expired", ToastAndroid.SHORT);
      }
    }).catch(_e => { });
  }, [session]);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        accountEmail,
        setAccountEmail,
      }}
    >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionContext.Provider>
  );
}
