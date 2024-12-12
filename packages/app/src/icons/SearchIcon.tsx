import Svg, { SvgProps, Circle, Path } from "react-native-svg";

interface Props extends SvgProps {
  filled?: boolean;
}

export const SearchIcon = ({
  filled = false,
  color = "#000",
  ...props
}: Props) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Circle
      cx={10.5}
      cy={10.5}
      r={6.75}
      fill={filled ? color : undefined}
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      stroke={color}
      strokeLinecap="square"
      strokeWidth={1.5}
      d="M15.5 15.5 20 20"
    />
  </Svg>
);
