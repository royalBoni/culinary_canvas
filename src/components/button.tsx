import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ ...buttonProps }: ButtonProps) => (
  <button
    className="w-fit p-4 rounded-lg bg-pink-500 text-white border-white text-lg"
    {...buttonProps}
  />
);
