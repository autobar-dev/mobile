import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import UserContext from "../../../contexts/UserContext";

import { styles } from "./styles";

export type MenuItemProps = {
  style?: any;
  icon?: JSX.Element;
  rightElement?: JSX.Element;
  color: string;
  label: string;
  onPress?: () => void;
  dividerAbove?: boolean;
};

export default function MenuItem(props: MenuItemProps) {
  return (
    <View style={[
      styles.root,
      props.dividerAbove ? styles.dividerAbove : {},
      props.style
    ]}>
      <TouchableOpacity
        onPress={props.onPress}
      >
        <View style={styles.row}>
          <View style={styles.iconAndLabel}>
            {
              props.icon && (
                <View
                  style={styles.icon}
                  children={props.icon}
                />
              )
            }
            <Text style={[styles.label, { color: props.color }]}>{ props.label }</Text>
          </View>
          <View style={styles.rightElement} children={props.rightElement} />
        </View>
      </TouchableOpacity>
    </View>
  );
}