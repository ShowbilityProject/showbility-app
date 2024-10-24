import Svg, { SvgProps, Path } from "react-native-svg";

interface Props extends SvgProps {
  filled?: boolean;
}

export const CommentIcon = ({
  filled = false,
  color = "#000",
  ...props
}: Props) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={filled ? color : undefined}
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.99 2.667c-5.15 0-9.324 3.496-9.324 7.81 0 2.498 1.406 4.717 3.585 6.146L6 21l4.398-2.835c.519.074 1.049.12 1.592.12 5.15 0 9.324-3.495 9.324-7.809 0-4.313-4.174-7.81-9.324-7.81Z"
      clipRule="evenodd"
    />
  </Svg>
);
