import { useDispatch } from "react-redux";
import { testActions, testSelectors } from "../redux/testSlice";
import { useSelector } from "react-redux";

const TestClient = () => {
   const dispatch = useDispatch();

   const { add, subtract, addNumber } = testActions;

   // get count with selector function directly
   // const count = useSelector((state: any) => state.test.count);

   const count = useSelector(testSelectors.getTestCount);

   const addHandler = () => {
      dispatch(add());
   };

   const subtractHandler = () => {
      dispatch(subtract());
   };

   const addNumberHandler = () => {
      dispatch(addNumber(5));
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
