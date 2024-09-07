import { useState } from "react";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "./Card";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BulkCreateUser: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      setIsPending(true);
      console.log("Uploading file:", selectedFile);
      const isSuccessful = Math.random() < 0.5;
      setTimeout(() => {
        navigate("/admin/submitted", {
          state: isSuccessful
            ? { success: true, message: "12 users updated successfully" }
            : {
                success: false,
                message:
                  "Failed to update rows 2, 3, 6. Please check user details for those rows and resubmit",
              },
        });
      }, 500);
    } else {
      alert("Please select a file.");
    }
  };

  return (
    <Card>
      <Typography variant="h3" my={2}>
        Bulk Edit Users
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "80%" }}>
        <Grid
          container
          columnSpacing={1}
          sx={{ padding: { xs: 1, md: 3 }, my: 1, border: "1px dashed grey" }}
        >
          <Grid
            size={{ xs: 12, md: 8 }}
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "center", md: "flex-start" }}
            sx={{ mb: { xs: 2, md: 0 } }}
          >
            <Typography variant="body1">
              Upload updated user details as CSV file
            </Typography>
            <Typography variant="body2" color="primary">
              {selectedFile !== null && `${selectedFile.name} selected`}
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              Select file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
          <Button
            type="submit"
            disabled={isPending}
            variant="contained"
            sx={{ width: "200px" }}
          >
            {isPending ? (
              <CircularProgress size={24} style={{ color: "white" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default BulkCreateUser;
