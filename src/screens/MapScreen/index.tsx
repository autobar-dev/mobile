import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import UserContext from "../../contexts/UserContext";
import { getTokensFromEncryptedStorage } from "../../utils/getTokensFromEncryptedStorage";
import signOut from "../../utils/signOut";

export default function MapScreen({ navigation }: any) {
  const { user } = useContext(UserContext);
  const [tokens, setTokens] = useState<any>(undefined);

  useEffect(() => {
    getTokensFromEncryptedStorage().then((t) => { setTokens(t); });
  }, []);

  return (
    <View>
      <Button
        onPress={() => {
          signOut()
            .then(() => {
              navigation.navigate("SignIn");
            })
            .catch((e: any) => console.log(e.message));
        }}
        title="Sign out"
      />

      <Text style={{ color: "#181818" }}>Map Screen</Text>
      <Text style={{ marginTop: 20, color: "#181818", fontFamily: "monospace" }}>
        { JSON.stringify(user, null, 2) }
      </Text>

      <Text style={{ marginTop: 40, color: "#181818", fontFamily: "monospace" }}>
        { JSON.stringify({
          tokens,
        }, null, 2) }
      </Text>
    </View>
  );
}