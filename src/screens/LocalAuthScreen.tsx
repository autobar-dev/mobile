import React from "react";
import { View, Text, Button } from "react-native";

export default function LocalAuthScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Local Auth Screen</Text>
      <Button
        title="Local authorize"
        onPress={() => {
          navigation.navigate('Main');
        }}
      />
    </View>
  );
}