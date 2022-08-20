import React from "react";
import { View, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-ui-lib";
import BottomSheet from "@gorhom/bottom-sheet";
import SwitchSelector from "react-native-switch-selector";
import CodeInitSessionFragment from "../components/organisms/CodeInitSessionFragment";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MainScreen() {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [25, "80%"], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    //console.log("handleSheetChanges", index);
  }, []);

  const [activationMethod, setActivationMethod] = React.useState<"QR_CODE" | "NFC">("QR_CODE");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#131313" }}>
        <Text>Main Screen</Text>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleIndicatorStyle={{ backgroundColor: "#d3d3d3" }}
          backgroundStyle={{
            backgroundColor: "#232323",
          }}
        >
          <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: "#232323", alignItems: 'center', marginTop: 25 }}>
            <SwitchSelector
              options={[
                { value: "QR_CODE", customIcon: <IoniconsIcon size={18} name="qr-code-outline" color="#eeeeee" /> },
                { value: "NFC", customIcon: <MaterialIcon size={20} name="nfc" color="#eeeeee" /> },
              ]}
              initial={0}
              onPress={value => setActivationMethod(value as "QR_CODE" | "NFC")}
              textColor="#ffffff"
              buttonColor="#ed600e"
              borderColor="#ed600e"
              backgroundColor="transparent"
              borderWidth={1}
              hasPadding
              valuePadding={3}
              style={{
                width: 100
              }}
            />

            <View style={{ marginTop: 50 }}>
              {
                activationMethod == "QR_CODE" &&
                  <CodeInitSessionFragment />
              }
              {
                activationMethod == "NFC" &&
                  <Text style={{ color: "#eee", fontSize: 42 }}>NFC</Text>
              }
            </View>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}