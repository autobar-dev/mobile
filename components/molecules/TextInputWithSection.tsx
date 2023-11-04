import React from "react";
import { TextInput } from "react-native";
import { TextInputProps, View } from "react-native";

export function TextInputWithSection(props: TextInputProps & {
  section?: React.ReactNode;
}) {
  const { section } = props;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          {...props}
        />
        <View
          style={{
            position: "absolute",
            right: 10,
          }}
        >
          {section}
        </View>
      </View>
    </>
  );
}
