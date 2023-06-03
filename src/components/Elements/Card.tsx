import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <header className="mb-2 text-lg font-bold text-gray-700">{children}</header>
  );
};

const Body = ({ children }: Props) => {
  return <main>{children}</main>;
};

const Footer = ({ children }: Props) => {
  return <footer>{children}</footer>;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="p-3 bg-white border rounded border-neutral-100">
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
