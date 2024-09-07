import { Typography, CardActionArea, Icon } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "./Card";
import { menuList } from "../lib/menu";
import { useNavigate } from "react-router-dom";

export default function AdminMenu() {
  const navigate = useNavigate();

  return (
    <Card>
      <Typography variant="h3" my={3}>
        User Management Menu
      </Typography>
      <Grid container >
        {menuList.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
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
  );
}
