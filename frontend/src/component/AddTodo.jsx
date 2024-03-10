import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

function AddTodo() {
  const dispatch = useDispatch();

  const [parentTodoTitle, setParentTodoTitle] = useState("");

  function handleAddTodo() {
    dispatch(addTodo({ title: parentTodoTitle }));
    setParentTodoTitle("");
  }

 
  return (
    <React.Fragment>
      <input
        type="text"
        value={parentTodoTitle}
        onChange={(e) => setParentTodoTitle(e.target.value)}
        className="border-2 border-black"
      />
      <button onClick={handleAddTodo}>Add</button>
    </React.Fragment>
  );
}

export default AddTodo;
