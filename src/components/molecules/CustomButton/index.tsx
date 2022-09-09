import React from "react";
import { ActivityIndicator, Text, TouchableNativeFeedback, View } from "react-native";

import { styles } from "./styles";

type CustomButtonProps = {
  style?: any;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loader?: boolean;
};

export function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      style={styles.touchableOverlay}
      disabled={props.disabled}
    >
      <View style={[styles.button, props.style]}>
        {
          props.loader ?
            <ActivityIndicator size={"large"} color="#181818" />
          :
            <Text
              style={styles.label}
            >{ props.label }</Text>
        }
      </View>
    </TouchableNativeFeedback>
  );
}