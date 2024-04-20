import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { User, deleteUserRequest } from "../../types/requestTypes";
import { AllUsersResponse, MessageResponse, UserResponse } from "../../types/responseTypes";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/users/`,
  }),
  tagTypes:["users"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
      invalidatesTags:["users"]

    }),
    deleteUser: builder.mutation<MessageResponse,deleteUserRequest>({
      query: ({userId,adminId}) => ({
        url: `${userId}?id=${adminId}`,
        method: "DELETE",
       
      }),
      invalidatesTags:["users"]

    }),

    getAllUsers:builder.query<AllUsersResponse,string>({
      query: (adminId) => ({
        url: `all?id=${adminId}`
      }),
      providesTags:["users"]
  }),
})
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/users/${id}`
    );

    // const response= await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/users/${id}`);

    // const {data}:{data:UserResponse} = response

    return data;
  } catch (error) {
    console.error("Error in fetching user data:", error);
    throw error;
  }
};
export const { useLoginMutation,useDeleteUserMutation,useGetAllUsersQuery } = userApi;
