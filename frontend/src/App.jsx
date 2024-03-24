import { useSelector } from "react-redux";
import AddTodo from "./component/AddTodo";
import TodoItems from "./component/TodoItems";
import Section from "./component/Section";
function App() {
  const store = useSelector((state) => state.todoReducer);
  console.log(store);
  return (
    <div className="h-screen w-full p-4 bg-[#F0F3FA]">
      <div className="flex justify-around  ">
        <div className="flex flex-col gap-3">
          <AddTodo />
          <TodoItems />
        </div>
        <Section />
      </div>
    </div>
  );
}
export default App;
