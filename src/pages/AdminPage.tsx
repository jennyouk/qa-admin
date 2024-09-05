import { useState } from "react";
import { Box } from "@mui/material";
import MenuDrawer from "../components/MenuDrawer";
import { Outlet, useLocation } from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const adminTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#214f90",
    },
    secondary: {
      main: "#c1beba",
    },
    background: {
      default: "#f9f9f9",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#2c2c2c",
      secondary: "#2c2c2c",
    },
    action: {
      active: "#2c2c2c",
    },
    divider: "#76778b",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    button: {
      fontSize: "inherit",
      fontWeight: "inherit",
    },
    h3: {
      fontSize: 32,
      color: "#545454",
      fontWeight: 600,
    },
    h4: {
      fontSize: 28,
      color: "#6b6b6b",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          display: "flex",
          minHeight: "100vh",
        },
        "#root": {
          flexGrow: 1,
          display: "flex",
          maxWidth: "none",
          margin: 0,
          padding: 0,
          textAlign: "left",
        },
        form: {
          width: "100%",
        },
      },
    },
  },
});

export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        <MenuDrawer
          variant={location.pathname === "/admin" ? "temporary" : "permanent"}
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
