// import { configureStore } from "@reduxjs/toolkit";
// import { testReducer } from "./testSlice";

// export const store = configureStore({
//    reducer: {
//       test: testReducer,
//    },
//    devTools: process.env.NODE_ENV === "development",
//    middleware: getDefaultMiddleware => getDefaultMiddleware({}),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import {
   Action,
   CombinedState,
   configureStore,
   Reducer,
   ReducersMapObject,
   ThunkAction,
} from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import { StoreSchema } from "./types/store";
import { testReducer } from "./testSlice";
import { createReducerManager } from "./createReducerManager";
// import { $api } from '@/shared/api/api';
// import { rtkApi } from '@/shared/api/rtkApi';

export const makeStore = (initialState?: StoreSchema, context?: Context) => {
   const rootReducer: ReducersMapObject<StoreSchema> = {
      test: testReducer,

      // [rtkApi.reducerPath]: rtkApi.reducer,
   };

   const reducerManager = createReducerManager(rootReducer);

   const store = configureStore({
      reducer: reducerManager.reduce as Reducer<CombinedState<StoreSchema>>,
      devTools: process.env.NODE_ENV === "development",
      preloadedState: initialState,
      middleware: getDefaultMiddleware => getDefaultMiddleware({}) /*.concat(rtkApi.middleware)*/,
   });

   // @ts-ignore
   store.reducerManager = reducerManager;
   return store;
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(context => makeStore(undefined, context));
