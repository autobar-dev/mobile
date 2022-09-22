import { useMemo } from "react";
import Svg, { Path } from "react-native-svg";

import IconProps from "../../types/IconProps";

export default function UserIcon(props: IconProps) {
  const height = useMemo(() => (21.5/21.5 * props.width), [props.width]);

  return (
    <Svg style={[{ width: props.width, height }, props.style]} viewBox="0 0 21.5 21.5">
      <Path
        d="m 16.89,20.37 c -0.88,0.26 -1.92,0.38 -3.14,0.38 H 7.74998 c -1.22,0 -2.25999,-0.12 -3.13999,-0.38 0.22,-2.6 2.88999,-4.65 6.14001,-4.65 3.25,0 5.92,2.05 6.14,4.65 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 13.75,0.75 h -6 c -5,0 -7,2 -7,7 v 6 c 0,3.78 1.14,5.85 3.86,6.62 0.22,-2.6 2.89,-4.65 6.14,-4.65 3.25,0 5.92,2.05 6.14,4.65 2.72,-0.77 3.86,-2.84 3.86,-6.62 v -6 c 0,-5 -2,-7 -7,-7 z m -3,12.17 c -1.98,0 -3.58,-1.61 -3.58,-3.59 0,-1.97998 1.6,-3.58 3.58,-3.58 1.98,0 3.58,1.60002 3.58,3.58 0,1.98 -1.6,3.59 -3.58,3.59 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 14.33,9.33 c 0,1.98 -1.6,3.59 -3.58,3.59 -1.98,0 -3.57996,-1.61 -3.57996,-3.59 0,-1.97998 1.59996,-3.58 3.57996,-3.58 1.98,0 3.58,1.60002 3.58,3.58 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>
  );
}