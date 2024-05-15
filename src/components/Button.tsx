import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ ...buttonProps }: ButtonProps) => (
  <button
    className="flex gap-2 items-center w-fit p-2 rounded-lg bg-pink-500 text-white border-white text-lg hover:bg-pink-400 hover:text-gray-400"
    {...buttonProps}
  />
);
