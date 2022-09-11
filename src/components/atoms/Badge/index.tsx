import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type BadgeProps = {
  label: string;
  icon?: JSX.Element;
};

export default function Badge(props: BadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ props.label }</Text>
    </View>
  );
}