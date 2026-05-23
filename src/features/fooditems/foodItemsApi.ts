import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  ApiResponse,
  FoodItem,
  CreateFoodItemRequest,
  UpdateFoodItemRequest,
} from "../types/types";

export const foodItemsApi = createApi({
  reducerPath: "foodItemsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  tagTypes: ["FoodItems"],

  endpoints: (builder) => ({
    // Get All Food Items
    getFoodItems: builder.query<FoodItem[], void>({
      query: () => "/food-items",

      transformResponse: (response: ApiResponse<FoodItem[]>) =>
        response.data || [],

      providesTags: ["FoodItems"],
    }),

    // Get Single Food Item
    getFoodItemById: builder.query<FoodItem, number>({
      query: (id) => `/food-items/${id}`,

      transformResponse: (response: ApiResponse<FoodItem>) =>
        response.data as FoodItem,

      providesTags: (_result, _error, id) => [
        { type: "FoodItems", id },
      ],
    }),

    // Get Food Items By Category
    getFoodItemsByCategory: builder.query<FoodItem[], number>({
      query: (categoryId) => `/categories/${categoryId}/food-items`,

      transformResponse: (response: ApiResponse<FoodItem[]>) =>
        response.data || [],

      providesTags: ["FoodItems"],
    }),

    // Get Food Items By Sub Category
    getFoodItemsBySubCategory: builder.query<FoodItem[], number>({
      query: (subCategoryId) =>
        `/sub-categories/${subCategoryId}/food-items`,

      transformResponse: (response: ApiResponse<FoodItem[]>) =>
        response.data || [],

      providesTags: ["FoodItems"],
    }),

    // Create Food Item
    createFoodItem: builder.mutation<
      { message: string; food_item_id: number },
      CreateFoodItemRequest
    >({
      query: (body) => ({
        url: "/food-items",
        method: "POST",
        body,
      }),

      invalidatesTags: ["FoodItems"],
    }),

    // Update Food Item
    updateFoodItem: builder.mutation<
      { message: string },
      UpdateFoodItemRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/food-items/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["FoodItems"],
    }),

    // Delete Food Item
    deleteFoodItem: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/food-items/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["FoodItems"],
    }),
    uploadFoodImage: builder.mutation<
  { image_url: string },
  FormData
>({
  query: (formData) => ({
    url: "/upload/food-image",
    method: "POST",
    body: formData,
  }),
}),
  }),
});

export const {
  useGetFoodItemsQuery,
  useGetFoodItemByIdQuery,
  useGetFoodItemsByCategoryQuery,
  useGetFoodItemsBySubCategoryQuery,
  useCreateFoodItemMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
  useUploadFoodImageMutation,
} = foodItemsApi;