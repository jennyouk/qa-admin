import { useState } from "react";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import Card from "./Card";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const ExportUsers: React.FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClick = () => {
    setIsPending(true);
    const isSuccessful = true;
    setTimeout(() => {
      navigate("/admin/submitted", {
        state: isSuccessful
          ? {
              success: true,
              message:
                "Users file downloaded successfully. Please see your downloads folder.",
            }
          : {
              success: false,
              message: "Users file download failed. Please try again.",
            },
      });
    }, 500);
  };

  return (
    <Card>
      <Typography variant="h3" my={2}>
        Export Users
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          py: 2,
          px: 4,
          border: "1px dashed grey",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 0, sm: 8 },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ justifyContent: { xs: "center", sm: "start" } }}
        >
          <Typography variant="body1" my={2}>
            Export Users as CSV file
          </Typography>
        </Box>
        <Button
          onClick={onClick}
          disabled={isPending}
          variant="contained"
          sx={{ width: "200px", my: 2 }}
        >
          {isPending ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Export"
          )}
        </Button>
      </Box>
    </Card>
  );
};

export default ExportUsers;
