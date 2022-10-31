import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ScanBarcodeIcon from "../../atoms/ScanBarcodeIcon";
import BurgerButton from "../../molecules/BurgerButton";
import Logo from "../../molecules/Logo";

import { styles } from "./styles";

export default function Header() {
  const navigation: any = useNavigation();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#000000ff", "#18181800"]}
        // locations={[0.2, 0.8, 1]}
        style={styles.linearGradient}
      />

      <View style={styles.itemsWrapper}>
        <BurgerButton
          onPress={() => {
            console.log("Open menu");
            navigation.navigate("MenuModal");
          }}
        />

        <Logo
          iconColor="#f8f8f8"
          textColor="#f8f8f8"
          type="logo-with-text"
          style={styles.logo}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            console.log("Open barcode modal");
            navigation.navigate("BarcodeScannerModal");
          }}
        >
          <View style={styles.scanBarcodeWrapper}>
            <ScanBarcodeIcon
              color="#f8f8f8"
              width={20}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}