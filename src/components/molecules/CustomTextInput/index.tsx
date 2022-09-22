import React, { useMemo } from "react";
import { TextInput, Text, View } from "react-native";

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

export function CustomTextInput(props: CustomTextInputProps) {
  const autoCompleteType = useMemo(() => {
    switch(props.type) {
      case "email":
        return "email";
      case "password":
        return "password";
      case "text":
        return "off";
    }
  }, [props.type]);

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.inputWrapper,
          props.style,
          props.error && { borderColor: "#ef5050" },
        ]}
      >
        {
          props.label && (
            <Text style={styles.label}>
              { props.label }
            </Text>
          )
        }
        {
          props.icon && (
            <View style={styles.iconWrapper}>
              { props.icon }
            </View>
          )
        }
        {
          props.iconRight && (
            <View style={styles.iconRightWrapper}>
              { props.iconRight }
            </View>
          )
        }
        <TextInput
          style={[
            {
              paddingLeft: (props.icon) ? 58 : 23,
              paddingRight: (props.iconRight) ? 58 : 20,
            },
            styles.inputElement
          ]}
          selectionColor="#e3b04b"
          autoCapitalize={"none"}
          autoComplete={autoCompleteType}
          autoCorrect={false}
          secureTextEntry={props.type == "password" ? true : false}
          returnKeyType={props.returnKeyType}
          onSubmitEditing={props.onSubmitEditing}
          onChangeText={props.onChangeText}
          blurOnSubmit={false}
          ref={props.innerRef}
          value={props.value}
          placeholder={props.placeholder}
        />
      </View>
      {
        (props.error && typeof props.error == "string") && (
          <Text style={styles.errorLabel}>{ props.error }</Text>
        )
      }
    </View>
  );
}