import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

type buttonVariant = "primary" | "secondary" | "danger";
type buttonSize = "small" | "medium" | "large";
type buttonRounded = "small" | "medium" | "large" | "pill";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: buttonVariant;
  size?: buttonSize;
  rounded?: buttonRounded;
  children: ReactNode;
}

const styles = {
  base: "focus:ring-2 focus:outline-none font-semibold transition ease-in-out duration-200",
  disabled: "opacity-50 cursor-not-allowed",
  variant: {
    primary:
      "bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 text-white",
    secondary: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-800 text-white",
    danger: "bg-red-500 hover:bg-red-600 focus:ring-red-800 text-white",
  },
  size: {
    small: "px-4 py-1 text-xs",
    medium: "px-8 py-2 text-sm",
    large: "px-12 py-3 text-lg",
  },
  rounded: {
    small: "rounded-sm",
    medium: "rounded-md",
    large: "rounded-lg",
    pill: "rounded-full",
  },
};

export const Button = ({
  variant = "primary",
  size = "medium",
  rounded = "medium",
  children,
  className,
  disabled = false,
  ...props
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={clsx([
        styles.base,
        styles.variant[variant],
        styles.size[size],
        styles.rounded[rounded],
        disabled && styles.disabled,
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};
