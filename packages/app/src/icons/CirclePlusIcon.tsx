import Svg, { SvgProps, Path } from "react-native-svg";

export const CirclePlusIcon = ({ color = "#000", ...props }: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9.25 10.75v3.417h1.5V10.75h3.416v-1.5H10.75V5.833h-1.5V9.25H5.833v1.5H9.25ZM1.75 10a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
