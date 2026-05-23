export type User = {
  id: number;

  name: string;

  email: string;

  phone: string | null;

  role: "super_admin" | "admin" | "manager" | "staff" | "delivery_boy";

  status: "active" | "inactive" | "blocked";

  profile_image: string | null;

  last_login: string | null;

  created_at?: string;

  updated_at?: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;

  login: (data: { token: string; user: User }) => void;

  logout: () => void;

  isAuthenticated: boolean;
};
export interface Category {
  id: number;
  name: string;
  description: string | null;
  is_active: number;
  created_at: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
}
export interface SubCategory {
  id: number;
  name: string;
  description: string | null;
  category_id: number;
  category_name?: string;
  created_at: string;
}

export interface CreateSubCategoryRequest {
  name: string;
  description?: string;
  category_id: number;
}
export interface FoodItem {
  id: number;

  category_id: number;
  category_name?: string;

  sub_category_id?: number;
  sub_category_name?: string;

  name: string;

  description?: string;

  price: number;

  image?: string;

  is_available: number;

  created_at: string;
}
export interface CreateFoodItemRequest {
  category_id: number;

  sub_category_id?: number;

  name: string;

  description?: string;

  price: number;

  image?: string;

  is_available?: number;
}
export interface UpdateFoodItemRequest extends CreateFoodItemRequest {
  id: number;
}