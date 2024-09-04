import { useState } from "react";
import Card from "./Card";
import {
  Typography,
  //   Box,
  Button,
} from "@mui/material";
import ControlledTextField from "./ControlledTextField";
import {
  useForm,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

export default function SearchUser() {
  const [isPending, setIsPending] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    // reset,
    register,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data: unknown) => {
    setIsPending(true);
    // const isSuccessful = Math.random() < 0.5;
    setTimeout(() => {
      console.log("submitting", data);
      setIsPending(false);
    }, 500);
    // navigate("/admin/submitted", {
    //   state: isSuccessful
    //     ? { success: true, message: "User created successfully" }
    //     : { success: false, message: "Duplicate user details" },
    // });
  };

  return (
    <Card>
      <Typography variant="h3">Search for a User</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body2">Search by one or more fields</Typography>
        <ControlledTextField
          name="email"
          control={control}
          register={register}
          width="100%"
          errors={errors}
          rules={{
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          }}
          placeholder="Email"
        />
        <ControlledTextField
          name="firstName"
          control={control}
          register={register}
          width="50%"
          errors={errors}
          placeholder="First name"
          rules={{
            pattern: {
              value: /^[a-zA-Z\s-]+$/,
              message: "No special characters allowed",
            },
          }}
        />
        <ControlledTextField
          name="lastName"
          control={control}
          register={register}
          errors={errors}
          width="50%"
          placeholder="Last name"
          rules={{
            pattern: {
              value: /^[a-zA-Z\s-]+$/,
              message: "No special characters allowed",
            },
          }}
        />
        <Button type="submit" variant="contained" disabled={isPending}>
        {isPending ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Search"
              )}
        </Button>
      </form>
    </Card>
  );
}
