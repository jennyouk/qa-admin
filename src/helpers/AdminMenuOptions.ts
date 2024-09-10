import React from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const menuList = [
  {
    icon: React.createElement(PersonAddAlt1Icon),
    link: "create-user",
    label: "Create User",
    description:
      "Add a new user to the system including email, name, username, role, and allowed clients",
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
    label: "Find/Edit User",
    description: "Find a user in the system and view or edit their details",
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
