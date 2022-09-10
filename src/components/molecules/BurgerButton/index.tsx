import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { styles } from "./styles";

type BurgerButtonProps = {
  style?: any;
  onPress?: () => void;
};

export default function BurgerButton(props: BurgerButtonProps) {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
      style={props.style}
    >
      <View style={styles.root}>
        <View style={styles.linesWrapper}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}