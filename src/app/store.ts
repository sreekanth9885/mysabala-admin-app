import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { categoriesApi } from "../features/category/categoriesApi";
import { subCategoriesApi } from "../features/sub-categories/subCategoriesApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoriesApi.middleware,
      subCategoriesApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;