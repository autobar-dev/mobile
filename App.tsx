import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./src/screens/SignIn";
import User from "./src/types/User";
import flushUserHelper from "./src/utils/flushUser";
import MapScreen from "./src/screens/MapScreen";
import UserContext from "./src/contexts/UserContext";
import LocalAuthScreen from "./src/screens/LocalAuth";
import MenuModal from "./src/components/organisms/MenuModal";
import BarcodeScannerModal from "./src/components/organisms/BarcodeScannerModal";
import PouringModal from "./src/components/organisms/PouringModal";
import PouringContext from "./src/contexts/PouringContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const flushUser = () => flushUserHelper(user, setUser);

  const [pouringSerialNumber, setPouringSerialNumber] = useState<string | undefined>(undefined);

  const [initialRoute, setInitialRoute] = useState("SignIn");

  useEffect(() => {
    flushUser().then(() => {
      setIsUserLoading(false);
    })
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, flushUser, }}>
      <PouringContext.Provider value={{ pouringSerialNumber, setPouringSerialNumber }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={initialRoute}
          >
            <Stack.Group>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="LocalAuth" component={LocalAuthScreen} />
              <Stack.Screen name="Map" component={MapScreen} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="MenuModal"
                component={MenuModal}
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                }}
              />
              <Stack.Screen
                name="BarcodeScannerModal"
                component={BarcodeScannerModal}
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                }}
              />
              <Stack.Screen
                name="PouringModal"
                component={PouringModal}
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PouringContext.Provider>
    </UserContext.Provider>
  );
};