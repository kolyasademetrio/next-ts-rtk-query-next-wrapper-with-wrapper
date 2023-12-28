import { useTestActions, testSelectors } from "../redux/testSlice";
import { useSelector } from "react-redux";
import { DynamicModuleLoader } from "./DynamicModuleLoader";
import { dynamicReducer, dynamicSelectors } from "../redux/dynamicSlice";

const TestClient = () => {
   const { add, subtract, addNumber } = useTestActions();

   // get count with selector function directly
   // const count = useSelector((state: any) => state.test.count);

   const count = useSelector(testSelectors.getTestCount);
   const dynamicCount = useSelector(dynamicSelectors.getDynamicCount);

   const addHandler = () => {
      add();
   };

   const subtractHandler = () => {
      subtract();
   };

   const addNumberHandler = () => {
      addNumber(5);
   };

   return (
      <>
         <div>
            <button onClick={addHandler}>+</button>
            <button onClick={subtractHandler}>-</button>
            {dynamicCount}
            <DynamicModuleLoader reducers={{ dynamic: dynamicReducer }}>
               <button onClick={addNumberHandler}>add 5</button>
            </DynamicModuleLoader>
         </div>
         <div>{count}</div>
      </>
   );
};

export default TestClient;
