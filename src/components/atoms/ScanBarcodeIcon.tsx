import Svg, { Path } from "react-native-svg";

import IconProps from "../../types/IconProps";

export default function ScanBarcodeIcon(props: IconProps) {
  return (
    <Svg style={[{ width: props.width, height: (21.5/21.5 * props.width) }, props.style]} viewBox="0 0 21.5 21.5">
      <Path
        d="m 0.75,7.75 v -2.5 c 0,-2.49 2.01,-4.5 4.5,-4.5 h 2.5"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 13.75,0.75 h 2.5 c 2.49,0 4.5,2.01 4.5,4.5 v 2.5"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 20.75,14.75 v 1.5 c 0,2.49 -2.01,4.5 -4.5,4.5 h -1.5"
        stroke={props.color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 7.75,20.75 h -2.5 c -2.49,0 -4.5,-2.01 -4.5,-4.5 v -2.5"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 9.25,5.75 v 2 c 0,1 -0.5,1.5 -1.5,1.5 h -2 c -1,0 -1.5,-0.5 -1.5,-1.5 v -2 c 0,-1 0.5,-1.5 1.5,-1.5 h 2 c 1,0 1.5,0.5 1.5,1.5 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 17.25,5.75 v 2 c 0,1 -0.5,1.5 -1.5,1.5 h -2 c -1,0 -1.5,-0.5 -1.5,-1.5 v -2 c 0,-1 0.5,-1.5 1.5,-1.5 h 2 c 1,0 1.5,0.5 1.5,1.5 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 9.25,13.75 v 2 c 0,1 -0.5,1.5 -1.5,1.5 h -2 c -1,0 -1.5,-0.5 -1.5,-1.5 v -2 c 0,-1 0.5,-1.5 1.5,-1.5 h 2 c 1,0 1.5,0.5 1.5,1.5 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <Path
        d="m 17.25,13.75 v 2 c 0,1 -0.5,1.5 -1.5,1.5 h -2 c -1,0 -1.5,-0.5 -1.5,-1.5 v -2 c 0,-1 0.5,-1.5 1.5,-1.5 h 2 c 1,0 1.5,0.5 1.5,1.5 z"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>
  );
}