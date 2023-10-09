import React from "react";
import { Button, GestureResponderEvent } from "react-native";

export function HeaderNfcIndicator(props: {
  tintColor?: string,
  pressColor?: string,
  pressOpacity?: number,
  onPress: (event: GestureResponderEvent) => void,
}) {
  return (
    <Button
      onPress={props.onPress}
      title="NFC"
      color="#000"
    />
  );
}
