import { createBrowserRouter, Navigate } from "react-router-dom";

import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { FoodItemsList } from "./features/fooditems/FoodItemsList";
import { AddFoodItem } from "./features/fooditems/AddFoodItem";
import { EditFoodItem } from "./features/fooditems/EditFoodItem";
import { OrdersManagement } from "./screens/OrdersManagement";
import { Profile } from "./screens/Profile";

import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import { Categories } from "./features/category/Categories";
import { Subcategory } from "./features/sub-categories/Subcategory";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: localStorage.getItem("token")
      ? <Navigate to="/" replace />
      : <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        Component: Layout,

        children: [
          {
            index: true,
            Component: Dashboard,
          },

          {
            path: "food-items",
            Component: FoodItemsList,
          },

          {
            path: "food-items/add",
            Component: AddFoodItem,
          },

          {
            path: "food-items/edit/:id",
            Component: EditFoodItem,
          },

          {
            path: "orders",
            Component: OrdersManagement,
          },

          {
            path: "profile",
            Component: Profile,
          },
          {
            path: "categories",
            Component: Categories,
          },
          {
            path: "sub-categories",
            Component: Subcategory,  
          }
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);