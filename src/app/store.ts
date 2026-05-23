import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { categoriesApi } from "../features/category/categoriesApi";
import { subCategoriesApi } from "../features/sub-categories/subCategoriesApi";
import { foodItemsApi } from "../features/fooditems/foodItemsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
    [foodItemsApi.reducerPath]: foodItemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoriesApi.middleware,
      subCategoriesApi.middleware,
      foodItemsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;