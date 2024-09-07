import React, { useState, useEffect } from "react";
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
import { useSearchParams, useNavigate } from "react-router-dom";
import { userRoles } from "../lib/constants";
import { User } from "../../types";
import ControlledClientSelect from "./ControlledClientSelect";

const EditUser: React.FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const userId = searchParams.get("id");

  useEffect(() => {
    if (!userId) {
      navigate("/admin/search-user");
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const data = await response.json();
        setUserData(data.user);
        console.log("Received user data:", data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, navigate]);

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: Record<string, unknown>
  ) => {
    setIsPending(true);
    console.log("submitting user data:", data);
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      navigate("/admin/submitted", {
        state: response.ok
          ? { success: true, message: "User details updated successfully" }
          : { success: false, message: result.error },
      });
    } catch (error) {
      console.error("Failed to update user", error);
      navigate("/admin/submitted", {
        state: { success: false, message: `User update failed; ${error}` },
      });
    } finally {
      setIsPending(false);
    }
  };

  if (!userData) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <Typography variant="h3" my={2}>
        Edit User
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
            defaultValue={userData.email}
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
              defaultValue={userData.firstName}
              rules={{ required: "First name is required" }}
            />
            <ControlledTextField
              name="lastName"
              control={control}
              register={register}
              errors={errors}
              width="50%"
              label="Last name"
              defaultValue={userData.lastName}
              rules={{ required: "Last name is required" }}
            />
          </Box>
          <Box display="flex" gap="16px" width="100%">
            <ControlledTextField
              name="username"
              control={control}
              register={register}
              width="49%"
              errors={errors}
              label="Username"
              defaultValue={userData.username}
              rules={{ required: "Username is required" }}
              disabled={true}
            />
            <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
              Last Password Reset: 2024-06-24{userData.lastPasswordChange}
            </Typography>
          </Box>
          <ControlledClientSelect
            control={control}
            errors={errors}
            defaultValue={userData.clients}
            setValue={setValue}
          />
          <Controller
            name="userType"
            control={control}
            defaultValue={userData.userType}
            rules={{
              validate: (value) => value !== "" || "User Role must be selected",
            }}
            render={({ field }) => (
              <FormControl error={!!errors.userType} fullWidth>
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
                  {userRoles.map((role, idx) => (
                    <MenuItem value={role.value} key={idx}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.userRole && (
                  <FormHelperText error>
                    {errors.userRole.message as string}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="active"
            control={control}
            defaultValue={userData.active}
            render={({ field }) => (
              <FormControl error={!!errors.active} fullWidth>
                <InputLabel
                  htmlFor="active-select-list"
                  sx={{ color: "#9E9E9E" }}
                >
                  Active Status
                </InputLabel>
                <Select
                  {...field}
                  id="active-select-list"
                  label="Active Status"
                  onChange={(e) => field.onChange(e.target.value === "active")}
                  value={field.value ? "active" : "deactivated"}
                  sx={{
                    color: field.value === "none" ? "#9E9E9E" : "black",
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "error.main",
                    },
                  }}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="deactivated">Deactivated</MenuItem>
                </Select>
                {errors.active && (
                  <FormHelperText error>
                    {errors.active.message as string}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
            Last Login: 2024-09-03{userData.lastLogin}
          </Typography>
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

export default EditUser;
