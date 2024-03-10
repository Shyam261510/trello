import {useSelector} from "react-redux"
import AddTodo from "./component/AddTodo"
import TodoItems from "./component/TodoItems"
function App(){
  const store = useSelector(state => state.todoReducer)
  console.log(store.todo)
  return (
    <div>
    <AddTodo/>
    <TodoItems/>
    </div>
  )
}
export default App;