import { rtkApi } from "./rtkApi";

interface MutationApiDTO {
   completed: boolean;
   id: number;
   title: string;
   userId: number;
}

interface MutationBody {
   completed: boolean;
   id: number;
   title: string;
   userId: number;
}

export const TODOS = "TODOS";

export const mutationApi = rtkApi.injectEndpoints({
   overrideExisting: true,
   endpoints: build => ({
      // the first param is either data returned from request or from transformResponse
      // the second param is type of body param of query function
      postTodo: build.mutation<string, MutationBody>({
         query: body => ({
            method: "POST",
            url: `/todos`,
            body,
         }),
         invalidatesTags: [TODOS],
         transformResponse: (response: MutationApiDTO) => response.title,
      }),
   }),
});

export const {
   endpoints: { postTodo },
   usePostTodoMutation,
} = mutationApi;
