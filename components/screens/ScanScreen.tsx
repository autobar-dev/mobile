import * as React from "react";
import { Button, View } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScanScreen() {
  const navigation = useNavigation();

  const { tokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  const [serialNumberInput, setSerialNumberInput] = React.useState<string>("");
  const [otkInput, setOtkInput] = React.useState<string>("");

  const [activateLoading, setActivateLoading] = React.useState<boolean>(false);

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            padding: 16,
          }}
        >
          <TextInput
            placeholder="Serial number"
            onChangeText={setSerialNumberInput}
            value={serialNumberInput}
            style={{
              fontSize: 24,
              marginBottom: 8,
            }}
          />
          <TextInput
            placeholder="OTK"
            onChangeText={setOtkInput}
            value={otkInput}
            style={{
              fontSize: 24,
              marginBottom: 8,
            }}
          />
          <Button
            title={activateLoading ? "Activating..." : "Activate"}
            disabled={activateLoading}
            onPress={async () => {
              setActivateLoading(true);

              try {
                await providers.module.activate(tokens, serialNumberInput, otkInput);
                navigation.navigate("Activated", {
                  serial_number: serialNumberInput,
                });
              } catch (e) {
                console.log("Error activating module", e);
              }

              setActivateLoading(false);
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
