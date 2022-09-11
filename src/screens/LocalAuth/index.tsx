import React, { useState, useEffect, useRef } from "react";
import { Button, Text, View } from "react-native";
import { getTokensFromEncryptedStorage } from "../../utils/getTokensFromEncryptedStorage";
import signOut from "../../utils/signOut";

export default function LocalAuthScreen({ navigation }: any) {
  const [tokens, setTokens] = useState<any>(undefined);

  useEffect(() => {
    getTokensFromEncryptedStorage().then((t) => { setTokens(t); });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={() => {
          signOut()
            .then(() => navigation.navigate("SignIn"))
            .catch((e: any) => console.log(e.message));
        }}
        title="Sign out"
      />
      <Text style={{ color: "#181818" }}>LocalAuthScreen</Text>
      <Text style={{ marginTop: 40, color: "#181818", fontFamily: "monospace" }}>
        { JSON.stringify({
          tokens,
        }, null, 2) }
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("Map");
        }}
        title="Map"
      />
    </View>
  );
}