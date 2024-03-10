import React,{useState} from "react"
import {useDispatch, useSelector } from "react-redux"
import { addTodo } from "../features/todoSlice"
function AddTodo (){
  const [todo,setTodo] = useState(useSelector(state => state.todoReducer.todo))
  const dispatch = useDispatch()
  function addTodoHandler(e){
    e.preventDefault()
dispatch(addTodo(todo))
  }
  return(
    <React.Fragment>
<form onSubmit={addTodoHandler}>
  <input type="text" placeholder="Add items..." value={todo.title} onChange={e => setTodo({...todo,title:e.target.value})} className="border-2 border-black"/>
  <button>Add</button>
</form>
    </React.Fragment>
  )
}
export default AddTodo