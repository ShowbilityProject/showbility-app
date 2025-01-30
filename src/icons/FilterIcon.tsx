import Svg, { Path, SvgProps } from "react-native-svg";

export const FilterIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#171719"
      fillRule="evenodd"
      d="M14.176 4.906a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM2 7.765h8.624a3.708 3.708 0 0 0 7.105 0h3.33V5.859h-3.274a3.707 3.707 0 0 0-7.217 0H2v1.906Zm10.435 10.588h8.624v-1.906H12.49a3.707 3.707 0 0 0-7.217 0H2v1.906h3.33a3.708 3.708 0 0 0 7.105 0Zm-5.353-1.059a1.8 1.8 0 1 1 3.6 0 1.8 1.8 0 0 1-3.6 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
