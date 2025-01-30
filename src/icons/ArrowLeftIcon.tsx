import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowLeftIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke="#000"
      strokeWidth={1.5}
      d="m16.861 21.723-9.528-9.528 9.528-9.528"
    />
  </Svg>
);
