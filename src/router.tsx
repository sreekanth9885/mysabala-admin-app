import { createBrowserRouter, Navigate } from "react-router-dom";

import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { FoodItemsList } from "./screens/FoodItemsList";
import { AddFoodItem } from "./screens/AddFoodItem";
import { EditFoodItem } from "./screens/EditFoodItem";
import { OrdersManagement } from "./screens/OrdersManagement";
import { Profile } from "./screens/Profile";

import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";

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
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);