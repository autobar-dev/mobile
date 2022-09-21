import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NfcManager, { Ndef, NfcEvents, NfcTech, TagEvent } from "react-native-nfc-manager";
import { Alert } from "react-native";
import { URL } from "react-native-url-polyfill";

import SignInScreen from "./src/screens/SignIn";
import User from "./src/types/User";
import flushUserHelper from "./src/utils/flushUser";
import MapScreen from "./src/screens/MapScreen";
import UserContext from "./src/contexts/UserContext";
import LocalAuthScreen from "./src/screens/LocalAuth";
import NfcContext from "./src/contexts/NfcContext";
import { getTokensFromEncryptedStorage } from "./src/utils/getTokensFromEncryptedStorage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const flushUser = () => flushUserHelper(user, setUser);

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag: TagEvent) => {
      console.log("NFC tag discovered:", tag);

      // THIS IS ALL HAPPY PATH AND RUNS ON SIGN IN AND LOCAL AUTH

      if(tag.ndefMessage.length == 0) {
        return;
      }

      const payload = tag.ndefMessage[0].payload as number[];
      const uriProtocol = Ndef.RTD_URI_PROTOCOLS[payload[0]];
      const text = uriProtocol + String.fromCharCode(...payload.slice(1));

      const url = new URL(text);
      const pathElements = url.pathname.split("/");
      const moduleSerialNumber = pathElements.slice(-1)[0];

      const { accessToken } = await getTokensFromEncryptedStorage(); 

      console.log("Scanned tag with payload:", text);

      const response = await fetch(`https://api.autobar.ovh/modules/${moduleSerialNumber}/start`, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      });

      const responseJson = await response.json();

      console.log(responseJson);

      Alert.alert(`Response for start on module ${moduleSerialNumber}: ${response.status}`);
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      console.log("NFC session closed");
    });

    NfcManager.registerTagEvent();
  }, []);

  const [initialRoute, setInitialRoute] = useState("SignIn");

  useEffect(() => {
    flushUser().then(() => {
      setIsUserLoading(false);
    })
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, flushUser, }}>
      {/* <NfcContext.Provider value={{  }}> */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={initialRoute}
          >
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="LocalAuth" component={LocalAuthScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      {/* </NfcContext.Provider> */}
    </UserContext.Provider>
  );
};