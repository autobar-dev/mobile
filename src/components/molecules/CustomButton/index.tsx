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
    <View style={[styles.touchableWrapper, props.style]}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        style={styles.touchableOverlay}
        disabled={props.disabled}
      >
        <View style={[styles.button]}>
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
    </View>
  );
}