import { configureStore } from "@reduxjs/toolkit";
import { testReducer } from "./testSlice";

export const store = configureStore({
   reducer: {
      test: testReducer,
   },
   devTools: process.env.NODE_ENV === "development",
   middleware: getDefaultMiddleware => getDefaultMiddleware({}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
