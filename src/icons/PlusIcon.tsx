import Svg, { SvgProps, Path } from "react-native-svg";

export const PlusIcon = ({ color = "#000", ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M23.335 12H.668M12.001 23.334V.667"
    />
  </Svg>
);
