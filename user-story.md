# User Story: QA Tool_Admin User Management – Engineering Logic 

| Name | Version | Date | Comments |
| --- | --- | --- | --- |
| Jenny Ouk (jenny.ouk@atomadvantage.ai) | .1 draft | 9/23/2024 |  |

## Problem Statement: 

The QA tool that will be leased to clients need an Admin screen so that clients can handle their own users.  

## High Level Requirements: 

As an admin user, I want to be able to manage my own users, so that I can do this self-service task without the need to reach out to ATOM Dev. 

## Functional Requirements

### Access and Routes

1. User Management menu will be accessed through the record ranger home page. 
  - One option for access is to add a menu button to the record ranger home page that opens a popover menu containing link to logout, and for admin users, a link to the user management menu. Future functionalities can be added to this popover menu.

2. Access to `/admin` will be controlled on Router.tsx through a protected route.
  - Custom protected route component should be added (can be added to Router.tsx outside of Router component or separately in ProtectedRoute.tsx)
     ```
     const ProtectedRoute = ({ role, children }) => {
        if (role !== 'admin') {
          return <Navigate to="/home" replace />;
        }
        return children;
      };
    ```
  - The following routes should be added to Router component at the same level as "/login" and "/home"
    ```
    <Route path="/admin" element={
      <ProtectedRoute role={role}>
        <AdminPage />
      </ProtectedRoute>
    }>
      <Route index element={<AdminMenu />} />
      <Route path="create-user" element={<CreateUser />} />
      <Route path="bulk-create-user" element={<BulkCreateUser />} />
      <Route path="search-user" element={<SearchUser />} />
      <Route path="edit-user" element={<EditUser />} />
      <Route path="bulk-edit-user" element={<BulkEditUser />} />
      <Route path="export-users" element={<ExportUsers />} />
      <Route path="submitted" element={<SubmitScreen />} />
      <Route path="*" element={<AdminPage />} />
    </Route>
    ```
### User Management Menu Options

1. The list of menu options will be kept as an array in `src/helpers/menu.ts`. Each element will have have an MUI icon, a link string, a label string, and a description string. Example:
  ```
  {
    icon: React.createElement(PersonAddAlt1Icon),
    link: "create-user",
    label: "Create User",
    description:
      "Add a new user to the system including email, name, username, role, and allowed clients",
  },
  ```
  Storing the menu constants separately allows for easier edits and updates in the future
2. The options will be as follows:
  - Create User 
  - Bulk Create User 
  - Find/Edit User 
  - Bulk Edit User 
  - Export Users

### "/admin" User Management Home Page
1. The menu list will be imported from the helpers folder `import { menuList } from "../../helpers/menu"`
2. Each menu item will be rendered as a CardActionArea (from MUI) and laid out in a Grid (from MUI v5.15.15)[^1]
   ```
    <Grid container>
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
     ```

[^1]: If MUI version is updated in the future, Grid components must be replaced with Grid2 
   
