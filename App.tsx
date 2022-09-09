import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import LocalAuthScreen from './src/screens/LocalAuthScreen';
import MainScreen from './src/screens/MainScreen';
import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

const outfitFonts = {
  "Outfit-Black": require("./assets/fonts/Outfit-Black.ttf"),
  "Outfit-Bold": require("./assets/fonts/Outfit-Bold.ttf"),
  "Outfit-ExtraBold": require("./assets/fonts/Outfit-ExtraBold.ttf"),
  "Outfit-Medium": require("./assets/fonts/Outfit-Medium.ttf"),
  "Outfit-Regular": require("./assets/fonts/Outfit-Regular.ttf"),
  "Outfit-SemiBold": require("./assets/fonts/Outfit-SemiBold.ttf"),
  "Outfit-Thin": require("./assets/fonts/Outfit-Thin.ttf"),
  "Outfit-Light": require("./assets/fonts/Outfit-Light.ttf"),
  "Outfit-ExtraLight": require("./assets/fonts/Outfit-ExtraLight.ttf"),
};

export default function App() {
  const [fontsLoaded] = useFonts({
    ...outfitFonts,
  });

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SignIn"
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="LocalAuth" component={LocalAuthScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
