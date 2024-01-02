import build from "next/dist/build";
import buildSlice from "./buildSlice";
import { testApi } from "./testApi";

export interface TestSchema {
   count: number;
   items: {}[];
   item: {};
   error: boolean;
   isLoading: boolean;
}

const initialState: TestSchema = {
   count: 0,
   items: [],
   item: {},
   error: false,
   isLoading: false,
};

const testSlice = buildSlice({
   name: "test",
   initialState,
   reducers: {
      add: state => {
         state.count += 1;
      },
      subtract: state => {
         state.count -= 1;
      },
      addNumber: (state, action) => {
         state.count += action.payload;
      },
   },
   extraReducers(builder) {
      builder.addMatcher(testApi.endpoints.getTodos.matchFulfilled, (state, action) => {
         state.items = action.payload.test;
         state.isLoading = false;
         state.error = false;
      });
      builder.addMatcher(testApi.endpoints.getTodos.matchPending, state => {
         state.isLoading = true;
         state.error = false;
      });
      builder.addMatcher(testApi.endpoints.getTodos.matchRejected, state => {
         state.error = true;
         state.isLoading = false;
      });
   },
});

const getTestCount = (state: any) => state.test.count;
const getTodos = (state: any) => state.test.items;

export const testSelectors = {
   getTestCount,
   getTodos,
};

export const { actions: testActions } = testSlice;
export const { reducer: testReducer } = testSlice;
export const { useActions: useTestActions } = testSlice;
