import { type HTMLProps } from "react";
import { useFormContext } from "react-hook-form";

import { TextInput } from "../text-input";

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
};

/**
 * NOTE: This component is ready to use when wrapped with FormProvider from RHF
 */
export const FormTextArea = ({
  name,
  label,
  ...textProps
}: FormTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>

      <textarea
        {...register(name)}
        id={name}
        cols={10}
        rows={10}
        className="w-full outline-pink-500 rounded-lg px-3 py-1.5 shadow"
      ></textarea>
    </div>
  );
};
