import { useMemo } from "react";
import Svg, { Path } from "react-native-svg";

import IconProps from "../../types/IconProps";

export default function SettingsIcon(props: IconProps) {
  const height = useMemo(() => (20.372293/21.51 * props.width), [props.width]);

  return (
    <Svg style={[{ width: props.width, height }, props.style]} viewBox="0 0 21.51 20.372293">
      <Path
        d="m 10.75,13.186227 c 1.6569,0 3,-1.3431 3,-3 0,-1.6568999 -1.3431,-2.9999999 -3,-2.9999999 -1.6569,0 -3,1.3431 -3,2.9999999 0,1.6569 1.3431,3 3,3 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="M 0.75,11.066127 V 9.3061271 c 0,-1.04 0.85,-1.89996 1.9,-1.89996 1.81,0 2.55,-1.28 1.64,-2.85 -0.52,-0.9 -0.21,-2.07 0.7,-2.59 L 6.72,0.97616708 c 0.79,-0.47 1.81,-0.19 2.28,0.60000002 l 0.11,0.19 c 0.9,1.57 2.38,1.57 3.29,0 l 0.11,-0.19 C 12.98,0.78616708 14,0.50616708 14.79,0.97616708 l 1.73,0.99000002 c 0.91,0.52 1.22,1.69 0.7,2.59 -0.91,1.57 -0.17,2.85 1.64,2.85 1.04,0 1.9,0.84996 1.9,1.89996 v 1.7599999 c 0,1.04 -0.85,1.9 -1.9,1.9 -1.81,0 -2.55,1.28 -1.64,2.85 0.52,0.91 0.21,2.07 -0.7,2.59 l -1.73,0.99 c -0.79,0.47 -1.81,0.19 -2.28,-0.6 l -0.11,-0.19 c -0.9,-1.57 -2.38,-1.57 -3.29,0 l -0.11,0.19 c -0.47,0.79 -1.49,1.07 -2.28,0.6 l -1.73,-0.99 c -0.91,-0.52 -1.22,-1.69 -0.7,-2.59 0.91,-1.57 0.17,-2.85 -1.64,-2.85 -1.05,0 -1.9,-0.86 -1.9,-1.9 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>
  );
}
