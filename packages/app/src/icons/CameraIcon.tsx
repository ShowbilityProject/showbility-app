import Svg, { SvgProps, Path } from "react-native-svg";
export const CameraIcon = ({ color = "#000", ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M7.817 3.971A2 2 0 0 1 9.532 3h4.936a2 2 0 0 1 1.715.971L17.4 6H21a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.6l1.217-2.029ZM12 9c-2.758 0-5 2.242-5 5s2.242 5 5 5 5-2.242 5-5-2.242-5-5-5Zm-3.421 5A3.426 3.426 0 0 1 12 10.579 3.426 3.426 0 0 1 15.421 14 3.426 3.426 0 0 1 12 17.421 3.426 3.426 0 0 1 8.579 14Z"
      clipRule="evenodd"
    />
  </Svg>
);
