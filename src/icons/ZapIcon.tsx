import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const ZapIcon = ({ color = "#000", ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <Path
      fill={color}
      d="m8.38 19.737 2.12-5.14a.621.621 0 0 0-.413-.837l-4.7-1.26c-.46-.123-.626-.704-.259-1.034l8.882-8.494c.49-.469 1.25.056.998.675l-2.119 5.14c-.142.347.05.74.413.837L18 10.883c.46.123.627.704.26 1.035L9.371 20.43c-.485.45-1.245-.076-.993-.695h.002Z"
    />
  </Svg>
);
