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
  label: string;
  rules: RegisterOptions | undefined;
  width: string;
  errors: FieldErrors;
  defaultValue?: string;
  disabled?: boolean;
}

export default function ControlledTextField({
  control,
  register,
  name,
  label,
  rules,
  width,
  errors,
  defaultValue='',
  disabled=false,
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
            {...register(name, rules)}
            error={!!errors[name]}
            label={label}
            disabled={disabled}
            helperText={errors[name]?.message as string}
          />
        </>
      )}
    />
  );
}
