import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Category {
  id: number;
  name: string;
  description: string | null;
  is_active: number;
  created_at: string;
}

interface CreateCategoryRequest {
  name: string;
  description?: string;
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL, // Use env variable like authApi
    prepareHeaders: (headers) => {
      // Get token from localStorage (same as authApi)
      const token = localStorage.getItem("token");
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (response: ApiResponse<Category[]>) => response.data || [],
      providesTags: ['Categories'],
    }),
    
    // Create new category
    createCategory: builder.mutation<{ message: string; id: number }, CreateCategoryRequest>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    
    // Update category
    updateCategory: builder.mutation<{ message: string }, { id: number; name: string; description?: string }>({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    
    // Delete category
    deleteCategory: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;