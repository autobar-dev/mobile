import { useMemo } from "react";
import Svg, { Path } from "react-native-svg";

import IconProps from "../../types/IconProps";

export default function SignOutIcon(props: IconProps) {
  const height = useMemo(() => (17.5/17.739859 * props.width), [props.width]);

  return (
    <Svg style={[{ width: props.width, height }, props.style]} viewBox="0 0 17.739859 17.5">
      <Path
        d="m 14.42989,11.37 2.56,-2.56 -2.56,-2.56"
        stroke={props.color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="M 6.75,8.8101 H 16.91999"
        stroke={props.color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="M 8.74999,16.75 C 4.33,16.75 0.75,13.75 0.75,8.75 c 0,-5 3.58,-8 7.99999,-8"
        stroke={props.color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>
  );
}