import { forwardRef, type HTMLProps } from "react";

type TextInputProps = HTMLProps<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (inputProps, ref) => (
    <input
      ref={ref}
      className="w-full outline-pink-500 rounded-lg px-3 py-1.5 shadow"
      {...inputProps}
    />
  )
);
