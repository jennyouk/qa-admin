import { useLocation } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Card from "../Card";
import { useNavigate } from "react-router-dom";

const SubmitScreen: React.FC = () => {
  const location = useLocation();
  const success = location.state?.success;
  const message = location.state?.message;
  const navigate = useNavigate();

  return (
    <Card>
      <Typography variant="h3" my={2}>
        {success ? "Success!" : "There was an error"}
      </Typography>
      <Typography variant="body1" mb={4}>
        {message}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button variant="contained" onClick={() => navigate("/admin")}>
          Return to User Management
        </Button>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Card>
  );
};

export default SubmitScreen;
