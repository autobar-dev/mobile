import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { TokensContext } from "../../contexts/TokensContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Haptics from "expo-haptics";
import Spinner from "react-native-loading-spinner-overlay";

const urlRegex = /^https:\/\/a5r.ovh\/a\/([A-Z0-9]{6})\/([a-zA-Z0-9]{12})$/g;

export function ScanScreen() {
  const navigation = useNavigation();

  const { tokens } = React.useContext(TokensContext);
  const { providers } = React.useContext(AppContext);

  const [cameraPermission, setCameraPermission] = React.useState<boolean>(false);

  const [scanned, setScanned] = React.useState<boolean>(false);
  const [activateLoading, setActivateLoading] = React.useState<boolean>(false);

  const requestCameraPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setCameraPermission(status === "granted");
  };

  React.useEffect(() => {
    requestCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    if (scanned) {
      return;
    }

    setScanned(true);

    let matches = [...data.matchAll(urlRegex)];

    if (matches.length == 0) {
      console.log("Invalid QR code. Matches:", matches);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setScanned(false);
      return;
    }

    const serialNumber = matches[0][1];
    const otk = matches[0][2];

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    console.log(`Activating ${serialNumber} with OTK ${otk}...`);

    activate(serialNumber, otk);
  }

  const activate = (serialNumber: string, otk: string) => {
    new Promise(async (resolve, reject) => {
      setActivateLoading(true);

      console.log("Activating module");

      try {
        await providers.module.activate(tokens, serialNumber, otk);
        console.log("Module activated");
        setScanned(false);
        navigation.navigate("Activated", {
          serial_number: serialNumber,
        });
      } catch (e) {
        console.log("Error activating module", e);
      }

      setActivateLoading(false);
    });
  }

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            height: "100%",
            padding: 16,
          }}
        >
          <Spinner
            visible={activateLoading}
            textContent={"Activating..."}
            textStyle={{ color: "#FFF" }}
          />
          {
            cameraPermission ? (
              <BarCodeScanner
                onBarCodeScanned={handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            ) : (
              <View>
                <Text>Camera permission not granted</Text>
                <Button
                  onPress={() => requestCameraPermissions()}
                  title="Grant access"
                />
              </View>
            )
          }
        </View>
      </SafeAreaView>
    </>
  );
}
