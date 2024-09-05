import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
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

function App() {

  return (
      <BrowserRouter>
        <Routes>
          {/* all "/admin/*" routes can be nested in record ranger's routes */}
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
          {/* Below route is for demo site only */}
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
