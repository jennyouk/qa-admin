import { useState } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { clientList } from "../lib/constants";

interface ControlledClientSelectProps {
  control: Control;
  errors: FieldErrors;
  defaultValue?: string | string[];
  setValue: (name: string, value: string | string[]) => void;
}

export default function ControlledClientSelect({
  control,
  errors,
  defaultValue = [],
  setValue,
}: ControlledClientSelectProps) {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value;
    if (value.includes("selectAll")) {
      if (!selectAll) {
        setValue("clients", clientList);
      } else {
        setValue("clients", []);
      }
      setSelectAll(!selectAll);
    } else {
      setValue("clients", value);
      setSelectAll(value.length === clientList.length);
    }
  };

  return (
    <Controller
      name="clients"
      control={control}
      defaultValue={defaultValue}
      rules={{
        validate: (value) =>
          value.length > 0 || "At least one client must be selected",
      }}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors.clients}>
          <InputLabel htmlFor="client-select-list">
            Select Allowed Clients
          </InputLabel>
          <Select
            {...field}
            id="client-select-list"
            label="Select Allowed Clients"
            multiple
            onChange={handleSelectAll}
          >
            <MenuItem value={"selectAll"}>Select All</MenuItem>
            {clientList.map((client, idx) => (
              <MenuItem value={client} key={idx}>
                {client}
              </MenuItem>
            ))}
          </Select>
          {errors.clients && (
            <FormHelperText error>
              {errors.clients.message as string}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
