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

const CreateUser: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const userRoles = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "tester", label: "Tester" },
  ];

  const clientList = ["client1", "client2", "client3", "client4"];

  const onSubmit: SubmitHandler<FieldValues> = async (data: unknown) => {
    setIsPending(true);
    const isSuccessful = Math.random() < 0.5;
    setTimeout(() => {
      console.log("submitting", data);
      setIsPending(false);
    }, 500);
    navigate("/admin/submitted", {
      state: isSuccessful
        ? { success: true, message: "User created successfully" }
        : { success: false, message: "Duplicate user details" },
    });
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
            placeholder="Email"
          />
          <Box display="flex" gap="16px" width="100%">
            <ControlledTextField
              name="firstName"
              control={control}
              register={register}
              width="50%"
              errors={errors}
              placeholder="First name"
              rules={{ required: "First name is required" }}
            />
            <ControlledTextField
              name="lastName"
              control={control}
              register={register}
              errors={errors}
              width="50%"
              placeholder="Last name"
              rules={{ required: "Last name is required" }}
            />
          </Box>
          <Box display="flex" gap="16px" width="100%">
            <ControlledTextField
              name="username"
              control={control}
              register={register}
              width="50%"
              errors={errors}
              placeholder="Username"
              rules={{ required: "Username is required" }}
            />
            <ControlledTextField
              name="password"
              control={control}
              register={register}
              width="50%"
              errors={errors}
              placeholder="Password"
              rules={{ required: "Password is required" }}
            />
          </Box>

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
                <InputLabel
                  htmlFor="client-select-list"
                  sx={{ color: "#9E9E9E" }}
                >
                  Select Allowed Clients
                </InputLabel>
                <Select
                  {...field}
                  id="client-select-list"
                  label="Select Allowed Clients"
                  multiple
                  defaultValue={[]}
                >
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
            name="userRole"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => value !== "" || "User Role must be selected",
            }}
            render={({ field }) => (
              <FormControl error={!!errors.userRole} fullWidth>
                <InputLabel
                  htmlFor="users-select-list"
                  sx={{ color: "#9E9E9E" }}
                >
                  User Role
                </InputLabel>
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
                {errors.userRole && (
                  <FormHelperText error>
                    {errors.userRole.message as React.ReactNode}
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
              onClick={() => reset()}
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
