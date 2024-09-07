import { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { API_BASE_URL } from "../lib/constants";

const ExportUsers: React.FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClick = async () => {
    setIsPending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/export`, {});
      if (!response.ok) {
        navigate("/admin/submitted", {
          state: {
            success: false,
            message: "Users file download failed. Please try again.",
          },
        });
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv";
      a.click();
      window.URL.revokeObjectURL(url);
      navigate("/admin/submitted", {
        state: {
          success: true,
          message:
            "Users file downloaded successfully. Please see your downloads folder.",
        },
      });
      return;
    } catch (err) {
      throw new Error(`Failed to export users, ${err}`);
    }
    setIsPending(false);
  };

  return (
    <Card>
      <Typography variant="h3" my={2}>
        Export Users
      </Typography>
      <Grid
        container
        columnSpacing={1}
        width={{ xs: "100%", md: "80%" }}
        sx={{ padding: { xs: 1, md: 3 }, my: 1, border: "1px dashed grey" }}
      >
        <Grid size={{ xs: 12, sm: 8 }} display="flex" alignItems="center">
          <Typography variant="body1">
            Export all user and user details as a CSV file
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 8 }}
          display="flex"
          justifyContent={{ xs: "center", sm: "flex-end" }}
        >
          <Button
            onClick={onClick}
            disabled={isPending}
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            {isPending ? (
              <CircularProgress size={24} style={{ color: "white" }} />
            ) : (
              "Export"
            )}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExportUsers;
