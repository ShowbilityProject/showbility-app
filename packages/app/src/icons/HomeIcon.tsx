import React from "react";
import Svg, { SvgProps, Mask, Path } from "react-native-svg";

interface Props extends SvgProps {
  filled?: boolean;
}

export const HomeIcon = ({
  filled = false,
  color = "#000",
  ...props
}: Props) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    {filled ? (
      <>
        <Mask id="a" fill="#fff">
          <Path
            fillRule="evenodd"
            d="M2.825 7.658A2 2 0 0 0 2 9.276V21a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.277a2 2 0 0 0-.826-1.62l-8.006-5.805a2 2 0 0 0-2.35 0L2.825 7.659ZM16 17H8v1.5h8V17Z"
            clipRule="evenodd"
          />
        </Mask>
        <Path
          fill={color}
          fillRule="evenodd"
          d="M2.825 7.658A2 2 0 0 0 2 9.276V21a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.277a2 2 0 0 0-.826-1.62l-8.006-5.805a2 2 0 0 0-2.35 0L2.825 7.659ZM16 17H8v1.5h8V17Z"
          clipRule="evenodd"
        />
        <Path
          fill={color}
          d="m2.825 7.658-.784-1.08.784 1.08Zm18.35 0-.784 1.08.783-1.08Zm-8.008-5.806-.782 1.08.783-1.08Zm-2.349 0L10.035.775l.783 1.079ZM8 17v-1.333H6.667V17H8Zm8 0h1.333v-1.333H16V17Zm-8 1.5H6.667v1.333H8V18.5Zm8 0v1.333h1.333V18.5H16ZM3.333 9.276c0-.213.103-.414.275-.54L2.041 6.58A3.333 3.333 0 0 0 .667 9.276h2.666Zm0 11.724V9.276H.667V21h2.666Zm.667.667A.667.667 0 0 1 3.333 21H.667A3.333 3.333 0 0 0 4 24.333v-2.666Zm16 0H4v2.666h16v-2.666Zm.667-.667a.667.667 0 0 1-.667.667v2.666A3.333 3.333 0 0 0 23.333 21h-2.666Zm0-11.723V21h2.666V9.277h-2.666Zm-.276-.54a.667.667 0 0 1 .276.54h2.666a3.333 3.333 0 0 0-1.376-2.699l-1.566 2.16Zm-8.006-5.806 8.006 5.806 1.566-2.159L13.95.773 12.385 2.93Zm-.783 0c.233-.169.55-.169.783 0L13.95.773a3.333 3.333 0 0 0-3.915.001l1.567 2.158ZM3.608 8.738l7.994-5.805L10.035.774 2.04 6.579l1.567 2.158ZM8 18.333h8v-2.666H8v2.666Zm1.333.167V17H6.667v1.5h2.666ZM16 17.167H8v2.666h8v-2.666ZM14.667 17v1.5h2.666V17h-2.666Z"
          mask="url(#a)"
        />
      </>
    ) : (
      <>
        <Path
          stroke={color}
          strokeWidth={1.5}
          d="M2.75 9.276c0-.4.192-.776.515-1.012L11.26 2.46a1.25 1.25 0 0 1 1.468 0l8.007 5.805c.324.235.516.611.516 1.012V21c0 .69-.56 1.25-1.25 1.25H4c-.69 0-1.25-.56-1.25-1.25V9.276Z"
        />
        <Path fill={color} d="M8 17h8v1.5H8z" />
      </>
    )}
  </Svg>
);
