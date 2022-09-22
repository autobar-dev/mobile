import Svg, { Path } from "react-native-svg";

import IconProps from "../../types/IconProps";

export default function ArrowRightIcon(props: IconProps) {
  return (
    <Svg style={[{ width: props.width, height: (17.340019/8.5947523 * props.width) }, props.style]} viewBox="0 0 8.5947523 17.340019">
      <Path
        d="m 0.75,0.75 6.51997,6.52002 c 0.77,0.77 0.77,2.03 0,2.8 l -6.51997,6.52"
        stroke={props.color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>
  );
}
