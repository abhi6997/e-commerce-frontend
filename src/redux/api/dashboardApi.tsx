import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatisticsResponse, getBarChartsResponse, getLineChartsResponse, getPieChartsResponse } from "../../types/responseTypes";


export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    statistics: builder.query<StatisticsResponse, string>({
      query: (id) => `statistics?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    pie: builder.query<getPieChartsResponse, string>({
      query: (id) => `get-pie-charts?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query<getBarChartsResponse, string>({
      query: (id) => `get-bar-charts?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query<getLineChartsResponse, string>({
      query: (id) => `get-line-charts?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useBarQuery, useStatisticsQuery, useLineQuery, usePieQuery } =
  dashboardApi;