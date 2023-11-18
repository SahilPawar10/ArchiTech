import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { KPI } from "./types";

export const dashBoardAPI = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  endpoints: (builder) => ({
    kpiData: builder.query<KPI, void>({
      query: () => {
        return {
          url: "/kpi",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useKpiDataQuery } = dashBoardAPI;
