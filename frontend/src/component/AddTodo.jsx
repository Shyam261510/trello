import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../features/todoSlice";

function AddTodo() {
  const [todo, setTodo] = useState(
    useSelector((state) => state.todoReducer.todo)
  );
  const dispatch = useDispatch();
  function addTodoHandler(e) {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo({ ...todo, title: "" });
  }
  return (
    <React.Fragment>
      <form
        onSubmit={addTodoHandler}
        className="flex flex-col gap-2  p-5 rounded-lg shadow-[4px_6px_20px_12px_#cbd5e0]"
      >
        <input
          type="text"
          placeholder="Add items..."
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          className="border-none p-1 rounded-md"
          required
        />
        <button className="bg-[#343434] text-[#F0F3FA] p-[2px] rounded-md duration-100 hover:bg-[#1a1818] hover:font-semibold">
          Add
        </button>
      </form>
    </React.Fragment>
  );
}
export default AddTodo;
