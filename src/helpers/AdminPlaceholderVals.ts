export const userRoles = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  { value: "userdelegate", label: "User and Delegate" },
  { value: "supervisor", label: "Supervisor" },
];

export const clientList = ["client1", "client2", "client3", "client4"];

export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // Production URL uses server URL
    : "http://localhost:5001"; // Localhost for development
