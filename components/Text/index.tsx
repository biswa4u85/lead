import React from "react";

const sizeClasses = {
  txtInterRegular14Bluegray90002: "font-inter font-normal",
  txtOpenSans20Blue900: "font-normal font-opensans",
  txtOpenSansRomanSemiBold16Black90001: "font-opensans font-semibold",
  txtInterMedium24: "font-inter font-medium",
  txtOpenSansSemiBold40: "font-opensans font-semibold",
  txtOpenSansRomanRegular16Gray800: "font-normal font-opensans",
  txtOpenSansSemiBold16Bluegray800: "font-opensans font-semibold",
  txtInterBold24: "font-bold font-inter",
  txtOpenSansBold40: "font-bold font-opensans",
  txtPoppinsSemiBold16: "font-poppins font-semibold",
  txtInterSemiBold32: "font-inter font-semibold",
  txtOpenSansMedium17: "font-medium font-opensans",
  txtOpenSansBold16Blue700: "font-bold font-opensans",
  txtOpenSansMedium16: "font-medium font-opensans",
  txtOpenSans16Gray900: "font-normal font-opensans",
  txtOpenSans14Gray500: "font-normal font-opensans",
  txtOpenSans14: "font-normal font-opensans",
  txtOpenSansRomanSemiBold24Black900: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold14Gray800: "font-opensans font-semibold",
  txtOpenSans16: "font-normal font-opensans",
  txtOpenSansRomanSemiBold20Bluegray800: "font-opensans font-semibold",
  txtOpenSans18: "font-normal font-opensans",
  txtPoppinsRegular18: "font-normal font-poppins",
  txtOpenSansRomanSemiBold32: "font-opensans font-semibold",
  txtInterBold16: "font-bold font-inter",
  txtInterMedium16: "font-inter font-medium",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtOpenSansRomanRegular16: "font-normal font-opensans",
  txtOpenSans16Black900: "font-normal font-opensans",
  txtOpenSansRomanSemiBold20Bluegray80001: "font-opensans font-semibold",
  txtPoppinsLight20: "font-light font-poppins",
  txtOpenSansSemiBold16Gray800: "font-opensans font-semibold",
  txtInterMedium14: "font-inter font-medium",
  txtInterMedium15: "font-inter font-medium",
  txtOpenSansBold32: "font-bold font-opensans",
  txtPoppinsMedium24: "font-medium font-poppins",
  txtPoppinsSemiBold24: "font-poppins font-semibold",
  txtOpenSansSemiBold16Gray50001: "font-opensans font-semibold",
  txtPoppinsRegular24: "font-normal font-poppins",
  txtOpenSansSemiBold28: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold40: "font-opensans font-semibold",
  txtPoppinsLight20Gray800: "font-light font-poppins",
  txtInterMedium20: "font-inter font-medium",
  txtOpenSansSemiBold24: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold20Black900: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold18Gray800: "font-opensans font-semibold",
  txtOpenSansMedium24: "font-medium font-opensans",
  txtInterRegular14: "font-inter font-normal",
  txtInterRegular15: "font-inter font-normal",
  txtOpenSansRomanSemiBold24Blue900: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold16Gray800: "font-opensans font-semibold",
  txtInterRegular16: "font-inter font-normal",
  txtInterRegular18: "font-inter font-normal",
  txtOpenSansRomanSemiBold28: "font-opensans font-semibold",
  txtOpenSans16Bluegray700: "font-normal font-opensans",
  txtInterMedium16Gray700: "font-inter font-medium",
  txtOpenSansBold40Blue900: "font-bold font-opensans",
  txtOpenSansRomanSemiBold20: "font-opensans font-semibold",
  txtOpenSansBold24: "font-bold font-opensans",
  txtOpenSansSemiBold20: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold40WhiteA700: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold24: "font-opensans font-semibold",
  txtInterBold46: "font-bold font-inter",
  txtOpenSansSemiBold16: "font-opensans font-semibold",
  txtOpenSans20Gray700: "font-normal font-opensans",
  txtOpenSansRomanRegular20: "font-normal font-opensans",
  txtOpenSans20: "font-normal font-opensans",
  txtOpenSans16Gray800: "font-normal font-opensans",
  txtOpenSans14Black900: "font-normal font-opensans",
  txtOpenSansMedium17Gray50001: "font-medium font-opensans",
  txtOpenSans24: "font-normal font-opensans",
  txtOpenSansRomanSemiBold18: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold20Bluegray900: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold16: "font-opensans font-semibold",
  txtOpenSansSemiBold16Blue900: "font-opensans font-semibold",
  txtOpenSansBold16: "font-bold font-opensans",
  txtOpenSans20Black900: "font-normal font-opensans",
  txtOpenSans20Gray70001: "font-normal font-opensans",
  txtOpenSansBold56: "font-bold font-opensans",
  txtOpenSansBold56Bluegray90001: "font-bold font-opensans",
  txtOpenSansRomanSemiBold14: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold13: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold56: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold12: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold16Blue900: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold18Blue900: "font-opensans font-semibold",
  txtPoppinsRegular40: "font-normal font-poppins",
  txtOpenSansRomanSemiBold18Gray700: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold16Gray700: "font-opensans font-semibold",
  txtOpenSansRomanSemiBold16Black900: "font-opensans font-semibold",
} as const;

export type TextProps = Partial<{
  className: string;
  size: keyof typeof sizeClasses;
  as: any;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  size,
  as,
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
