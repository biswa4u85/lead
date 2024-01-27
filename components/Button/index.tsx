import React from "react";

const shapes:any = {
  square: "rounded-none",
  circle: "rounded-[50%]",
  round: "rounded-lg",
} as const;
const variants:any = {
  outline: {
    teal_50: "border border-solid border-teal-50 text-blue_gray-900_03",
    blue_900: "border border-blue-900 border-solid text-blue-900",
    gray_500: "border-b border-gray-500 border-solid text-gray-900",
  },
  fill: {
    blue_900: "bg-blue-900 text-white-A700",
    gray_200: "bg-gray-200 text-gray-500_01",
    white_A700_63: "bg-white-A700_63",
  },
} as const;
const sizes:any = { xs: "p-1.5", sm: "p-2.5", md: "p-4" } as const;

export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    className: string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
