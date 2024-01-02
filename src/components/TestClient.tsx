import { useTestActions, testSelectors } from "../redux/testSlice";
import { useSelector } from "react-redux";
import { DynamicModuleLoader } from "./DynamicModuleLoader";
import { dynamicReducer, dynamicSelectors } from "../redux/dynamicSlice";
import { useGetTodoByIdQuery, useGetTodosQuery, useLazyGetTodosQuery } from "../redux/testApi";
import { usePostTodoMutation } from "../redux/mutationApi";

const TestClient = () => {
   const { data, error, isError, isFetching, isLoading, isSuccess } = useGetTodosQuery();
   const { data: dataById } = useGetTodoByIdQuery({ id: "1" });

   const { add, subtract, addNumber } = useTestActions();

   // get count with selector function directly
   // const count = useSelector((state: any) => state.test.count);

   const count = useSelector(testSelectors.getTestCount);
   const dynamicCount = useSelector(dynamicSelectors.getDynamicCount);

   const [postTodo, { isError: isError2, isLoading: isLoading2, isSuccess: isSuccess2 }] =
      usePostTodoMutation();
   const [getTodosTrigger, dataLazy] = useLazyGetTodosQuery();

   const loadMoreHandler = () => {
      getTodosTrigger();
   };

   const postTodoHandler = async (data: any) => {
      await postTodo(data);
      loadMoreHandler();
   };

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
               <button
                  onClick={() =>
                     postTodoHandler({
                        completed: false,
                        title: "test title",
                        userId: "test_id_1",
                     })
                  }
               >
                  Post todo
               </button>
               {JSON.stringify(dataLazy.data)}
               -------------------------------------
               {JSON.stringify(data)}
            </DynamicModuleLoader>
            <div style={{ padding: 10 }}>
               {data?.test &&
                  data.test.length > 0 &&
                  data.test.map(item => <div>{item.title}</div>)}
            </div>
            <div style={{ padding: 10 }}>{dataById?.titleUpdated}</div>
         </div>
         <div>{count}</div>
      </>
   );
};

export default TestClient;
