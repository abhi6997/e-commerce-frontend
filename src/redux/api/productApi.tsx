
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryResponse, MessageResponse, ProductResponse, SearchedProductResponse, SingleProductResponse } from "../../types/responseTypes";
import { DeleteProductRequest, UpdateProductRequest, searchParameterRequest } from "../../types/requestTypes";
import { NewProductRequest } from "../../types/requestTypes";



export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/products/` }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query<ProductResponse, string>({
            query: () => ({
                url: "latest",
                method: "GET"
            }),
            providesTags: ["product"]

        }),
        AllProducts: builder.query<ProductResponse, string>({
            query: (id) => ({
                url: `admin-products?id=${id}`,
                method: "GET"
            }),
            providesTags: ["product"]
        }),
        SingleProduct: builder.query<SingleProductResponse, string>({
            query: (id) => ({
                url: `${id}`,
                method: "GET"
            }),
            providesTags: ["product"]
        }),
        AllCategories: builder.query<CategoryResponse, string>({
            query: () => ({
                url: "categories",
                method: "GET"
            }),
            providesTags: ["product"]
        }),
        searchedProducts: builder.query<SearchedProductResponse, searchParameterRequest>({
            query: (data) => {
                let base = `all?search=${data.search}&page=${data.page}`
                if (data.price) base += `&price=${data.price}`
                if (data.sort) base += `&sort=${data.sort}`
                if (data.category) base += `&category=${data.category}`

                return base;
            },
            providesTags: ["product"]
        }),
        registerProduct: builder.mutation<MessageResponse, NewProductRequest>({
            query: ({ id, formData }) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData,
            }),

            invalidatesTags:["product"]

        }),

        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
                query: ({ userId, formData,productId }) => ({
                    url: `${productId}?id=${userId}`,
                    method: "PUT",
                    body: formData,
                }),
                

            invalidatesTags:["product"]



        }),

       


    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
        query: ({ userId, productId }) => ({
          url: `${productId}?id=${userId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["product"],
      }),
    }),

    
})

export const { useLatestProductsQuery, useAllProductsQuery, useAllCategoriesQuery, useSearchedProductsQuery , useRegisterProductMutation , useSingleProductQuery,useUpdateProductMutation, useDeleteProductMutation} = productApi;