import React from "react";
import { Box } from "@mui/material";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="flex"
      padding="30px"
      alignItems="center"
      flexDirection="column"
      borderRadius="8px"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.175)"
      sx={{
        width: {
          xs: "100%",
          lg: "80%",
          xl: "70%",
        },
        maxWidth: "100%",
        marginTop: {
          md: "2em",
          xl: "3em",
        },
      }}
    >
      {children}
    </Box>
  );
}
