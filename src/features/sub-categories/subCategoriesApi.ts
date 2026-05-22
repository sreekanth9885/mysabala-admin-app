import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SubCategory {
  id: number;
  name: string;
  description: string | null;
  category_id: number;
  category_name?: string;
  created_at: string;
}

interface CreateSubCategoryRequest {
  name: string;
  description?: string;
  category_id: number;
}

export const subCategoriesApi = createApi({
  reducerPath: 'subCategoriesApi',
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
  tagTypes: ['SubCategories'],
  endpoints: (builder) => ({
    getSubCategories: builder.query<SubCategory[], number | void>({
      query: (categoryId) => categoryId ? `/sub-categories?category_id=${categoryId}` : '/sub-categories',
      transformResponse: (response: { data?: SubCategory[] }) => response.data || [],
      providesTags: ['SubCategories'],
    }),
    
    getSubCategoryById: builder.query<SubCategory, number>({
      query: (id) => `/sub-categories/${id}`,
      transformResponse: (response: { data?: SubCategory }) => response.data as SubCategory,
      providesTags: (_result, _error, id) => [{ type: 'SubCategories', id }],
    }),
    
    createSubCategory: builder.mutation<{ message: string; id: number }, CreateSubCategoryRequest>({
      query: (body) => ({
        url: '/sub-categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SubCategories'],
    }),
    
    updateSubCategory: builder.mutation<{ message: string }, { id: number; name: string; description?: string; category_id: number }>({
      query: ({ id, ...body }) => ({
        url: `/sub-categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['SubCategories'],
    }),
    
    deleteSubCategory: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/sub-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SubCategories'],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryByIdQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoriesApi;