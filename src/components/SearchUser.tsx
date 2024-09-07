import { useState } from "react";
import Card from "./Card";
import { Typography, Box, Button, Grid } from "@mui/material";
import ControlledTextField from "./ControlledTextField";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { User } from "../../types";
import StartIcon from "@mui/icons-material/Start";
import { useNavigate } from "react-router-dom";

function cleanData(data: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(data).filter(
      (field) => field[1] && field[1].trim().length > 0
    )
  );
}

export default function SearchUser() {
  const [isPending, setIsPending] = useState(false);
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: Record<string, string>
  ) => {
    setIsPending(true);
    const query = new URLSearchParams(cleanData(data)).toString();
    if (!query) {
      setIsPending(false);
      alert("Please enter at least one field to search");
      return;
    }
    try {
      const response = await fetch(`/users?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create user, ${errorData.error}`);
      }

      const result = await response.json();
      console.log("User(s) found", result);
      setFoundUsers(result.users);
    } catch (error) {
      console.error("Failed to find user", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Card>
        <Typography variant="h3">Search for a User</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="100%"
            my={3}
          >
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
                label="Last name"
                rules={{
                  pattern: {
                    value: /^[a-zA-Z\s-]+$/,
                    message: "No special characters allowed",
                  },
                }}
              />
            </Box>
            <Typography variant="body2">
              Search by one or more fields
            </Typography>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Search"
              )}
            </Button>
          </Box>
        </form>
      </Card>
      {foundUsers.length > 0 && (
        <Card>
          <Typography variant="h4" mb={2}>
            Results
          </Typography>
          <Grid container columns={12}>
            <Grid container item xs={12} sx={{ fontWeight: 600 }}>
              <Grid item xs={5}>
                Email
              </Grid>
              <Grid item xs={3}>
                First Name
              </Grid>
              <Grid item xs={2}>
                Last Name
              </Grid>
              <Grid
                item
                xs={2}
                display="flex"
                justifyContent="end"
                textAlign="right"
              >
                View / Edit
              </Grid>
            </Grid>
            {foundUsers.map((user: User, idx) => (
              <Grid container key={idx} alignItems="center">
                <Grid
                  item
                  xs={5}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.firstName}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.lastName}
                </Grid>
                <Grid item xs={1}>
                  <Button
                    onClick={() => navigate(`/admin/edit-user?id=${user.id}`)}
                  >
                    <StartIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </>
  );
}
