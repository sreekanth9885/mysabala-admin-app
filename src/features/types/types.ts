export type User = {
  id: number;

  name: string;

  email: string;

  phone: string | null;

  role:
    | "super_admin"
    | "admin"
    | "manager"
    | "staff"
    | "delivery_boy";

  status:
    | "active"
    | "inactive"
    | "blocked";

  profile_image: string | null;

  last_login: string | null;

  created_at?: string;

  updated_at?: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;

  login: (data: {
    token: string;
    user: User;
  }) => void;

  logout: () => void;

  isAuthenticated: boolean;
};