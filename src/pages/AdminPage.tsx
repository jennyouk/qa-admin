import { useState } from "react";
import { Box } from "@mui/material";
import MenuDrawer from "../components/MenuDrawer";
import { Outlet, useLocation } from "react-router-dom";

export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // console.log(location.pathname);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <MenuDrawer
        variant={ location.pathname === "/admin" ? "temporary" : "permanent" }
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
  );
}
