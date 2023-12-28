import { createSlice } from "@reduxjs/toolkit";

interface TestSchema {
   count: number;
}

const initialState: TestSchema = {
   count: 0,
};

const testSlice = createSlice({
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
   extraReducers(builder) {},
});

export const { actions: testActions } = testSlice;
export const { reducer: testReducer } = testSlice;
