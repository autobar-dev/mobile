import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import Header from "../../components/organisms/Header";
import UserContext from "../../contexts/UserContext";
import { getTokensFromEncryptedStorage } from "../../utils/getTokensFromEncryptedStorage";
import signOut from "../../utils/signOut";

import { styles } from "./styles";

export default function MapScreen({ navigation }: any) {
  const { user } = useContext(UserContext);
  const [tokens, setTokens] = useState<any>(undefined);

  useEffect(() => {
    getTokensFromEncryptedStorage().then((t) => { setTokens(t); });
  }, []);

  return (
    <View style={styles.root}>
      <Header />
      
      <Text style={styles.screenLabel}>Map Screen</Text>
      
      <Text style={styles.textMonospace}>
        { JSON.stringify(user, null, 2) }
      </Text>

      <Text style={styles.textMonospace}>
        { JSON.stringify({
          tokens,
        }, null, 2) }
      </Text>

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
    </View>
  );
}