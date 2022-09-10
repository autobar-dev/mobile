import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./src/screens/SignIn";
import User from "./src/types/User";
import flushUserHelper from "./src/utils/flushUser";
import MapScreen from "./src/screens/MapScreen";
import UserContext from "./src/contexts/UserContext";
import LocalAuthScreen from "./src/screens/LocalAuth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const flushUser = () => flushUserHelper(user, setUser);

  const [initialRoute, setInitialRoute] = useState("SignIn");

  useEffect(() => {
    flushUser().then(() => {
      setIsUserLoading(false);
    })
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, flushUser, }}>
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
    </UserContext.Provider>
  );
};