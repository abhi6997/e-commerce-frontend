import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessageResponse, OrderListResponse, SingleOrderResponse } from "../../types/responseTypes";
import { NewOrderRequest, processOrderRequest } from "../../types/requestTypes";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/orders/` }),
    tagTypes: ["order"],
    endpoints: (builder) => ({
        newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
            query: (order) => ({
                url: "new",
                method: "POST",
                body: order
            }),
            invalidatesTags:["order"]
           
        }),
        allOrders: builder.query<OrderListResponse, string>({
            query: (userId) => ({
                url: `all?id=${userId}`


            }),
            providesTags: ["order"]
        }),
        myOrders: builder.query<OrderListResponse, string>({
            query: (userId) => ({
                url: `my-orders/${userId}`


            })
        }),
        specificOrder: builder.query<SingleOrderResponse, string>({
            query: (id) => ({
              
                url: `/specific-order/${id}`


            }),
            providesTags: ["order"]
        }),
        processOrder: builder.mutation<MessageResponse, processOrderRequest>({
            query: ({ userId, orderId }) => ({
                url: `process-order/${orderId}?id=${userId}`,
                method: "PUT"


            }),
            invalidatesTags:["order"]
        }),
        deleteOrder: builder.mutation<MessageResponse, processOrderRequest>({
            query: ({userId,orderId}) => ({
                url: `delete-order/${orderId}?id=${userId}`,
                method: "DELETE"


            }),
            invalidatesTags:["order"]
        }),

    })


})

export const { useNewOrderMutation, useAllOrdersQuery, useMyOrdersQuery, useSpecificOrderQuery, useDeleteOrderMutation, useProcessOrderMutation } = orderApi