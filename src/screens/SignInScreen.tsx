import React from "react";
import { View, Text, Button } from "react-native";

export default function SignInScreen({ navigation }) {
  console.log('Opened sign in');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign In Screen</Text>
      <Button
        title="Sign In"
        onPress={() => {
          navigation.navigate('LocalAuth');
        }}
      />
    </View>
  );
}