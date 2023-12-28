import buildSlice from "./buildSlice";

export interface DynamicSchema {
   dynamicCount: number;
}

const initialState: DynamicSchema = {
   dynamicCount: 99,
};

const dynamicSlice = buildSlice({
   name: "dynamic",
   initialState,
   reducers: {
      add: state => {
         state.dynamicCount += 1;
      },
      subtract: state => {
         state.dynamicCount -= 1;
      },
      addNumber: (state, action) => {
         state.dynamicCount += action.payload;
      },
   },
   extraReducers(builder) {},
});

const getDynamicCount = (state: any) => state.dynamic?.dynamicCount || 88;

export const dynamicSelectors = {
   getDynamicCount,
};
export const { actions: dynamicActions } = dynamicSlice;
export const { useActions: useDynamicActions } = dynamicSlice;
export const { reducer: dynamicReducer } = dynamicSlice;
