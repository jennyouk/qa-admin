import { useState } from "react";
import { Button,
  // Box,
  CircularProgress, Typography } from "@mui/material";
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
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.files);
  //   setSelectedFile(event.target.files![0]);
  // };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (selectedFile) {
//       setIsPending(true);
//       console.log("Uploading file:", selectedFile);
//       const isSuccessful = Math.random() < 0.5;
//       setTimeout(() => {
//         navigate("/admin/submitted", {
//           state: isSuccessful
//             ? { success: true, message: "15 users created successfully" }
//             : {
//                 success: false,
//                 message:
//                   "Failed to add rows 5, 7, 9. Please check user details for those rows and resubmit",
//               },
//         });
//       }, 500);
//     } else {
//       alert("Please select a file.");
//     }
//   };
  const onClick = () => {
    setIsPending(true);
    const isSuccessful = true;
    setTimeout(() => {
      navigate("/admin/submitted", {
        state: isSuccessful
          ? { success: true, message: "Users file downloaded successfully. Please see your downloads folder." }
          : {
              success: false,
              message:
                "Users file download failed. Please try again.",
            },
      });
    }, 500);
  }

  return (
    <Card>
      <Typography variant="h3" my={2}>
        Export Users
      </Typography>
      {/* <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} width="100%" my={3}>
          <Box
            display="flex"
            justifyContent="space-around"
            gap={2}
            width="100%"
          >
            <Box>
              <Typography variant="body1">
                Upload CSV file of users and user details.
              </Typography>
              <Typography variant="body2">
                {selectedFile !== null && `${selectedFile.name} selected`}
              </Typography>
            </Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={8}
          > */}
            <Button
              onClick={onClick}
              disabled={isPending}
              variant="contained"
              sx={{ width: "200px" }}
            >
              {isPending ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Export"
              )}
            </Button>
          {/* </Box>
        </Box>
      </form> */}
    </Card>
  );
};

export default ExportUsers;
