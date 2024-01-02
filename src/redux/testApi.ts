import { rtkApi } from "./rtkApi";

interface TestApiDTO {
   completed: boolean;
   id: number;
   title: string;
   userId: number;
}

export const testApi = rtkApi.injectEndpoints({
   overrideExisting: true,
   endpoints: build => ({
      getTodos: build.query<{ test: TestApiDTO[] }, void>({
         query: () => `/todos`,
         transformResponse: (response: TestApiDTO[]) => {
            return { test: response };
         },
      }),
      getTodoById: build.query<{ titleUpdated: string }, { id: string }>({
         query: ({ id }) => `/todos/${id}`,
         transformResponse: (response: TestApiDTO) => {
            return { titleUpdated: response.title };
         },
      }),
      // using it just to see typescript difference
      // if we use it without transformResponse
      getPosts: build.query<TestApiDTO[], void>({
         query: () => "/posts",
      }),
   }),
});

export const {
   endpoints: { getTodos, getTodoById, getPosts },
   useGetTodosQuery,
   useGetTodoByIdQuery,
   useGetPostsQuery,
} = testApi;
