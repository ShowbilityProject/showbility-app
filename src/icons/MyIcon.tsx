import Svg, { SvgProps, Circle, Mask, Path } from "react-native-svg";

interface Props extends SvgProps {
  filled?: boolean;
}

export const MyIcon = ({ filled = false, color = "#000", ...props }: Props) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle
      cx={12}
      cy={7}
      r={4.25}
      stroke={color}
      fill={filled ? color : undefined}
      strokeWidth={1.5}
    />
    <Mask id="a" fill="#fff">
      <Path d="M3 20a6 6 0 0 1 6-6h7a6 6 0 0 1 6 6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1Z" />
    </Mask>
    <Path
      stroke={color}
      fill={filled ? color : undefined}
      strokeWidth={3}
      d="M3 20a6 6 0 0 1 6-6h7a6 6 0 0 1 6 6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1Z"
      mask="url(#a)"
    />
  </Svg>
);
