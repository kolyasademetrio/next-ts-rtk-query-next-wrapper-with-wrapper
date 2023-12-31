import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const rtkApi = createApi({
   reducerPath: "api",
   tagTypes: [],
   baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
   // it is for next-redux-wrapper settings
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },
   endpoints: () => ({}),
});

export const { getRunningQueriesThunk } = rtkApi.util;
