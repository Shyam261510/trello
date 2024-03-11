import { useSelector } from "react-redux";
import AddTodo from "./component/AddTodo";
import TodoItems from "./component/TodoItems";
import Section from "./component/Section";
function App() {
  const store = useSelector((state) => state.todoReducer);
  console.log(store.todo);
  return (
    <div className="flex gap-3 ">
      <div className="flex gap-3">
        <AddTodo />
        <TodoItems />
      </div>
      <Section />
    </div>
  );
}
export default App;
