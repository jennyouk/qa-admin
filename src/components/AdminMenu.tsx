import { Typography, Grid, CardActionArea, Icon, Box } from "@mui/material";
import Card from "./Card";
import { menuList } from "../lib/menu";
import { useNavigate } from "react-router-dom";
// import React from "react";

export default function AdminMenu() {
  const navigate = useNavigate();



  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="start"
    >
      <Card>
        <Typography variant="h3" my={3}>
          User Management Menu
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {menuList.map((item, index) => (
            <Grid key={index} item xs={2} sm={4} md={4}>
              <CardActionArea
                sx={{ padding: 3 }}
                onClick={() => navigate(`/admin/${item.link}`)}
              >
                <Icon>{item.icon}</Icon>
                <Typography variant="h5">{item.label}</Typography>
                <Typography
                  variant="body2"
                  color="#858585f"
                  sx={{ color: "#636363f" }}
                >
                  {item.description}
                </Typography>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
