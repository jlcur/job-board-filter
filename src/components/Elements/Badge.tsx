import { type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

type badgeVariant = "default" | "primary" | "secondary";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  variant?: badgeVariant;
  children: ReactNode;
}

const styles = {
  base: "text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
  variant: {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-emerald-100 text-emerald-800 border border-green-200",
    secondary: "bg-orange-100 text-orange-800 border border-orange-200",
  },
};

export const Badge = ({
  variant = "default",
  children,
  className,
  ...props
}: Props) => {
  return (
    <span
      className={clsx([styles.base, styles.variant[variant], className])}
      {...props}
    >
      {children}
    </span>
  );
};
