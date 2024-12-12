import Svg, { SvgProps, Path } from "react-native-svg";

interface Props extends SvgProps {
  filled?: boolean;
}

export const LikeIcon = ({
  filled = false,
  color = "#000",
  ...props
}: Props) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={filled ? color : undefined}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.193 3.709c-1.583.431-2.671 1.488-3.314 2.254-.675-.808-1.83-1.922-3.505-2.306a4.967 4.967 0 0 0-2.37-.004 4.917 4.917 0 0 0-2.093 1.093c-1.986 1.604-2.52 5.057-.887 8.007 1.124 2.031 2.883 3.795 4.536 5.16a29.965 29.965 0 0 0 4.322 2.976 30.185 30.185 0 0 0 4.319-2.977c1.655-1.364 3.414-3.128 4.536-5.16 1.635-2.949 1.099-6.402-.887-8.006a4.924 4.924 0 0 0-2.192-1.116 4.972 4.972 0 0 0-2.465.079Z"
    />
  </Svg>
);
