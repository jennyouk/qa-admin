import React, { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Select,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import ControlledTextField from "./ControlledTextField";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { clientList, userRoles } from "../lib/constants";

const CreateUser: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: Record<string, unknown>
  ) => {
    setIsPending(true);
    const body = {
      ...data,
      last_login: null,
      last_password_change: null,
      active: true,
    };
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      navigate("/admin/submitted", {
        state: response.ok
          ? { success: true, message: "User created successfully" }
          : { success: false, message: result.error },
      });
    } catch (error) {
      console.error("Failed to create user", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card>
      <Typography variant="h3" my={2}>
        Create User
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          gap={2}
          padding={2}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          // width="inherit"
        >
          <ControlledTextField
            name="email"
            control={control}
            register={register}
            width="100%"
            errors={errors}
            rules={{
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            }}
            label="Email"
          />
          <Box display="flex" gap="16px" width="100%">
            <ControlledTextField
              name="firstName"
              control={control}
              register={register}
              width="50%"
              errors={errors}
              label="First name"
              rules={{
                required: "First name is required",
                pattern: {
                  value: /^[^\d!@#$%<>{}[\]&*()]+$/,
                  message: "Please enter a valid name",
                },
              }}
            />
            <ControlledTextField
              name="lastName"
              control={control}
              register={register}
              errors={errors}
              width="50%"
              label="Last name"
              rules={{
                required: "Last name is required",
                pattern: {
                  value: /^[^\d!@#$%<>{}[\]&*()]+$/,
                  message: "Please enter a valid name",
                },
              }}
            />
          </Box>
          <ControlledTextField
            name="username"
            control={control}
            register={register}
            width="100%"
            errors={errors}
            label="Username"
            rules={{ required: "Username is required" }}
          />

          <Controller
            name="clients"
            control={control}
            defaultValue={[]}
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
                  defaultValue={[]}
                >
                  <MenuItem value={clientList}>Select All</MenuItem>
                  {clientList.map((client, idx) => (
                    <MenuItem value={client} key={idx}>
                      {client}
                    </MenuItem>
                  ))}
                </Select>
                {errors.clients && (
                  <FormHelperText error>
                    {errors.clients.message as React.ReactNode}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="userType"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => value !== "" || "User Role must be selected",
            }}
            render={({ field }) => (
              <FormControl error={!!errors.userType} fullWidth>
                <InputLabel htmlFor="users-select-list">User Role</InputLabel>
                <Select
                  {...field}
                  id="users-select-list"
                  label="User Role"
                  defaultValue=""
                  sx={{
                    color: field.value === "none" ? "#9E9E9E" : "black",
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "error.main",
                    },
                  }}
                >
                  {/* <MenuItem value="none" disabled></MenuItem> */}
                  {userRoles.map((role, idx) => (
                    <MenuItem value={role.value} key={idx}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.userType && (
                  <FormHelperText error>
                    {errors.userType.message as React.ReactNode}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Box display="flex" gap="16px" my={2}>
            <Button type="submit" disabled={isPending} variant="contained">
              {isPending ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Save"
              )}
            </Button>
            <Button
              disabled={isPending}
              variant="contained"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Card>
  );
};

export default CreateUser;
