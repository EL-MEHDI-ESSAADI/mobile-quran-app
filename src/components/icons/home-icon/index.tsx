import React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "@/styles/index.cjs";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <Svg width="29" height="24" viewBox="0 0 29 24" fill="none">
      <Path
        d="M22.4934 0.217578L19.5161 1.40539L18.9341 0.078125L17.6132 0.220859C16.2877 0.363539 15.1335 0.84118 14.0297 1.71044C12.9258 0.839047 11.7796 0.361844 10.4724 0.220805L9.151 0.078125L8.56949 1.40539L5.59153 0.217578L0.00534058 13.2173L3.34099 14.486V23.9215L14.0291 18.5918L24.7171 23.9215V14.4947L28.0802 13.2177L22.4934 0.217578ZM4.98534 21.2681V15.1119L11.988 17.7762L4.98534 21.2681ZM13.207 16.4844L2.19118 12.2933L6.47078 2.33415L7.90995 2.90864L4.23395 11.2935L13.2069 14.7352L13.207 16.4844ZM13.207 12.9778L7.01441 10.6027C8.07231 10.0635 9.32855 9.99363 10.4751 10.4589L13.2069 11.6516L13.207 12.9778ZM13.207 9.86145L11.1066 8.94455C9.80539 8.41327 8.40175 8.37673 7.12797 8.78563L10.1742 1.83835C10.3434 1.88134 11.6483 1.83988 13.207 3.159V9.86145ZM14.8511 3.16004C16.3807 1.87215 17.8246 1.86039 17.9113 1.83841L20.945 8.75867C19.7447 8.37717 18.4396 8.42863 17.1751 8.94455L14.8511 9.89366V3.16004ZM14.8511 11.6659L17.7978 10.4626C18.912 10.0073 20.0747 10.0669 21.0838 10.5961L14.8511 12.9795V11.6659ZM23.0728 21.2681L16.0718 17.7768L23.0728 15.1188V21.2681ZM14.8511 16.4855V14.7356L23.8515 11.2941L20.1749 2.90864L21.6143 2.3342L25.8939 12.2929L14.8511 16.4855Z"
        fill={active ? colors.primary : colors.muted}
      />
    </Svg>
  );
}

export default HomeIcon;
