import { useState } from "react";
import { Button, Box, CircularProgress, Typography, Grid } from "@mui/material";
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
            ? {
                success: true,
                message:
                  "Example success message: 15 users created successfully",
              }
            : {
                success: false,
                message:
                  "[Example failure message] Failed to add rows 5, 7, 9 due to incomplete user details or duplicate username or email fields. Please check user details for those rows and resubmit.",
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
        Bulk Create Users
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "80%" }}>
        <Grid
          container
          columnSpacing={1}
          sx={{ padding: { xs: 1, md: 3 }, my: 1, border: "1px dashed grey" }}
        >
          <Grid
            item
            xs={12}
            md={8}
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "center", md: "flex-start" }}
            sx={{ mb: { xs: 2, md: 0 }}}
          >
            <Typography variant="body1">
              Upload CSV file of users and user details.
            </Typography>
            <Typography variant="body2" color="primary">
              {selectedFile !== null && `${selectedFile.name} selected`}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ whiteSpace: "nowrap" }}
            >
              Select File
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Grid>
        </Grid>
        <Box width="100%" display="flex" justifyContent="center">
          <Typography variant="body2">
            Tip: <a href="">Download</a> the CSV template file to get started.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
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
