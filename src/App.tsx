import { Route, BrowserRouter, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import AdminMenu from "./components/AdminMenu";
import CreateUser from "./components/CreateUser";
import BulkCreateUser from "./components/BulkCreateUser";
import SubmitScreen from "./components/SubmitScreen";
import SearchUser from "./components/SearchUser";
import EditUser from "./components/EditUser";
import BulkEditUser from "./components/BulkEditUser";
import ExportUsers from "./components/ExportUsers";
// import { Css } from "@mui/icons-material";

function App() {
  const colors = {
    background: "#f9f9f9",
    primary: "#214f90",
    secondary: "#c1beba",
    text: "#2c2c2c",
    border: "#76778b",
  };

  const adminTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.background,
        paper: colors.background,
      },
      text: {
        primary: colors.text,
        secondary: colors.text,
      },
      action: {
        active: colors.text,
      },
      divider: colors.border,
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

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminPage />}>
            <Route index element={<AdminMenu />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="bulk-create-user" element={<BulkCreateUser />} />
            <Route path="search-user" element={<SearchUser />} />
            <Route path="edit-user" element={<EditUser />} />
            <Route path="bulk-edit-user" element={<BulkEditUser />} />
            <Route path="export-users" element={<ExportUsers />} />*
            <Route path="submitted" element={<SubmitScreen />} />
            <Route path="*" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
