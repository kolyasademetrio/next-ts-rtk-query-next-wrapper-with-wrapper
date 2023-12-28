import { useTestActions, testSelectors } from "../redux/testSlice";
import { useSelector } from "react-redux";

const TestClient = () => {
   const { add, subtract, addNumber } = useTestActions();

   // get count with selector function directly
   // const count = useSelector((state: any) => state.test.count);

   const count = useSelector(testSelectors.getTestCount);

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
            <button onClick={addNumberHandler}>add 5</button>
         </div>
         <div>{count}</div>
      </>
   );
};

export default TestClient;
