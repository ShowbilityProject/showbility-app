import Svg, { SvgProps, Path } from "react-native-svg";

export const CloseIcon = ({ color = "#fff", ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="m10.94 12-8.803 8.803 1.06 1.061L12 13.061l8.803 8.803 1.061-1.06L13.061 12l8.803-8.803-1.06-1.06L12 10.94 3.197 2.137l-1.06 1.06L10.94 12Z"
      clipRule="evenodd"
    />
  </Svg>
);
