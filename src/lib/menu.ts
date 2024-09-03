import React from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const menuList = [
  {
    icon: React.createElement(PersonAddAlt1Icon),
    link: "create-user",
    label: "Create User",
    description:
      "Add a new user to the system including email, name, username, password, role, and allowed clients",
  },
  {
    icon: React.createElement(GroupAddIcon),
    link: "bulk-create-user",
    label: "Bulk Create User",
    description: "Upload multiple users and user details to the system",
  },
  {
    icon: React.createElement(PersonSearchIcon),
    link: "search-user",
    label: "Search User",
    description: "Find a user in the system and view their details",
  },
  {
    icon: React.createElement(EditIcon),
    link: "edit-user",
    label: "Edit User",
    description: "Modify user details such as name, role, and allowed clients",
  },
  {
    icon: React.createElement(EditNoteIcon),
    link: "bulk-edit-user",
    label: "Bulk Edit User",
    description: "Update details for multiple users using file upload",
  },
  {
    icon: React.createElement(FileDownloadIcon),
    link: "export-users",
    label: "Export Users",
    description: "Download all user and user details in the system",
  },
];
