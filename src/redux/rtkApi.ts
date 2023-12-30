import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const rtkApi = createApi({
   reducerPath: "api",
   tagTypes: [],
   baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
   endpoints: () => ({}),
});
