// import React, { useState } from "react";
import {
  Controller,
  Control,
  FieldValues,
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import {
  //   Box,
  //   Button,
  //   CircularProgress,
  Select,
  //   Typography,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
// import ControlledTextField from "./ControlledTextField";
// import Card from "./Card";
// import { useNavigate } from "react-router-dom";

interface ControlledSelectInputProps {
  control: Control;
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  rules: RegisterOptions | undefined;
  width: string;
  errors: FieldErrors;
  defaultValue?: string;
  disabled?: boolean;
  multiselect?: boolean;
  options: string[];
  selectAll?: boolean;
}

export default function ControlledSelectInput({
  control,
  name,
  label,
  rules,
  width,
  errors,
  defaultValue,
  multiselect = false,
  options,
}: ControlledSelectInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <FormControl sx={{ width: width }} error={!!errors.name}>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            {...field}
            id={name}
            label={label}
            multiple={multiselect}
            defaultValue={[]}
          >

            {options.map((option, idx) => (
              <MenuItem value={option} key={idx}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <FormHelperText error>
              {errors[name]?.message as string}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
