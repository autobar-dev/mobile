import React from "react";
import { ActivityIndicator, Text, TouchableNativeFeedback } from "react-native";
import { View } from "react-native-ui-lib";

import { styles } from "./styles";

type CustomButtonProps = {
  style?: any;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loader?: boolean;
};

export function CustomButton({ style, label, onPress, loader, disabled }: CustomButtonProps) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      style={styles.touchableOverlay}
      disabled={disabled}
    >
      <View style={[styles.button, style]}>
        {
          loader ?
            <ActivityIndicator size={"large"} color="#181818" />
          :
            <Text
              style={styles.label}
            >{ label }</Text>
        }
      </View>
    </TouchableNativeFeedback>
  );
}