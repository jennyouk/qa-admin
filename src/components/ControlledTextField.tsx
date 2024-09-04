import {
  Controller,
  Control,
  FieldValues,
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { TextField } from "@mui/material";

interface ControlledTextFieldProps {
  control: Control;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
  rules: RegisterOptions | undefined;
  width: string;
  errors: FieldErrors;
  defaultValue?: string;
}

export default function ControlledTextField({
  control,
  register,
  name,
  placeholder,
  rules,
  width,
  errors,
  defaultValue='',
}: ControlledTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            sx={{ width: width }}
            size="small"
            placeholder={placeholder}
            {...register(name, rules)}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
          />
        </>
      )}
    />
  );
}
