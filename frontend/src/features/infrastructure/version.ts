import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../lib/configuration";

interface VersionResponse {
  data: { short: string; full: string };
}

export const versionApi = createApi({
  reducerPath: "versionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getVersion: builder.query<VersionResponse, void>({
      query: () => "_version",
    }),
  }),
});

export const { useGetVersionQuery } = versionApi;
