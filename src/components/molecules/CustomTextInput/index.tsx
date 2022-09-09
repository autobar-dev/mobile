import React, { useMemo } from "react";
import { TextInput, Text } from "react-native";
import { View } from "react-native-ui-lib";

import { styles } from "./styles";

type CustomTextInputProps = {
  style?: any;
  label?: string;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
  type: "text" | "email" | "password";
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  onSubmitEditing?: ({ nativeEvent: { text, eventCount, target } }: any) => void;
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  innerRef?: any;
  error?: string | boolean;
};

export function CustomTextInput({ style, label, icon, iconRight, type, returnKeyType = "done", onSubmitEditing, onChangeText, innerRef, error, value, placeholder }: CustomTextInputProps) {
  const autoCompleteType = useMemo(() => {
    switch(type) {
      case "email":
        return "email";
      case "password":
        return "password";
      case "text":
        return "off";
    }
  }, [type]);

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.inputWrapper,
          style,
          error && { borderColor: "#a6352d" },
        ]}
      >
        {
          label && (
            <Text style={styles.label}>
              { label }
            </Text>
          )
        }
        {
          icon && (
            <View style={styles.iconWrapper}>
              { icon }
            </View>
          )
        }
        {
          iconRight && (
            <View style={styles.iconRightWrapper}>
              { iconRight }
            </View>
          )
        }
        <TextInput
          style={[
            {
              paddingLeft: (icon) ? 58 : 23,
              paddingRight: (iconRight) ? 58 : 20,
            },
            styles.inputElement
          ]}
          selectionColor="#e3b04b"
          autoCapitalize={"none"}
          autoComplete={autoCompleteType}
          autoCorrect={false}
          secureTextEntry={type == "password" ? true : false}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          blurOnSubmit={false}
          ref={innerRef}
          value={value}
          placeholder={placeholder}
        />
      </View>
      {
        (error && typeof error == "string") && (
          <Text style={styles.errorLabel}>{ error }</Text>
        )
      }
    </View>
  );
}