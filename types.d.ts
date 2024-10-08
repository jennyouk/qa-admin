export type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  clients: string;
  userType: string;
  lastLogin: string | null;
  lastPasswordChange: string | null;
  active: boolean;
};
