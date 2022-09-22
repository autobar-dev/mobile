import Svg, { Path } from "react-native-svg";

import IconProps from "../../types/IconProps";

export default function CloseCircleIcon(props: IconProps) {
  return (
    <Svg style={[{ width: props.width, height: (32.25/32.25 * props.width) }, props.style]} viewBox="0 0 32.25 32.25">
      <Path
        d="m 16.125,31.125 c 8.25,0 15,-6.75 15,-15 0,-8.25 -6.75,-15 -15,-15 -8.25,0 -15,6.75 -15,15 0,8.25 6.75,15 15,15 z"
        stroke={props.color}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 11.8801,20.37 8.49,-8.49"
        stroke={props.color}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 20.3701,20.37 -8.49,-8.49"
        stroke={props.color}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>
  );
}
