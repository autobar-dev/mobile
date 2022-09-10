import React from 'react';
import { View } from 'react-native';
import LogoOnly from '../atoms/LogoOnly';
import LogoText from '../atoms/LogoText';
import LogoWithText from '../atoms/LogoWithText';

type LogoProps = {
  type?: "logo-with-text" | "logo-only" | "text-only";
  iconColor?: string;
  textColor?: string;
  style?: any;
};

export default function Logo({ type = "logo-with-text", iconColor = "#f8f8f8", textColor = "#f8f8f8", style }: LogoProps) {
  return (
    <View>
      {
        type == "logo-only" &&
          <LogoOnly
            color={iconColor}
            style={[
              { height: "min-content", },
              style,
            ]}
          />
      }
      {
        type == "text-only" &&
          <LogoText
            color={textColor}
            style={[
              { height: "min-content", },
              style,
            ]}
          />
      }
      {
        type == "logo-with-text" &&
          <LogoWithText
            iconColor={iconColor}
            textColor={textColor}
            style={[
              // { height: "min-content", },
              style,
            ]}
          />
      }
    </View>
  );
}