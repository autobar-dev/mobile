import * as React from "react";
import { View, Text } from "react-native";

export function Badge({ color, type, label, value, style }: {
  type: "primary" | "secondary",
  color: string,
  label: string,
  value?: string,
  style?: any,
}) {
  return (
    <View
      style={{
        backgroundColor: type == "primary" ? color : "transparent",
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: color,
        flexDirection: "row",
        ...style,
      }}
    >
      <Text
        style={{
          color: type == "primary" ? "#fff" : color,
          fontWeight: "bold",
          fontSize: 16,
        }}
      >{`${label}${value && ":"}`}</Text>
      {value && (
        <Text
          style={{
            color: type == "primary" ? "#fff" : color,
            fontWeight: "normal",
            fontSize: 16,
            marginLeft: 4,
          }}
        >{value}</Text>
      )}
    </View>
  );
}
