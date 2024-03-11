import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubTodo } from "../features/todoSlice";

function TodoItems() {
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const [subTodoTitle, setSubTodoTitle] = useState("");

  // State to track visibility of input field and button for each todo
  const [visibleTodos, setVisibleTodos] = useState({});

  function subTodoHandler(id) {
    dispatch(
      addSubTodo({
        id: id,
        title: subTodoTitle,
      })
    );
    setSubTodoTitle("");
    // Reset visibility for this todo after adding sub todo
    setVisibleTodos((prevState) => ({ ...prevState, [id]: false }));
  }

  function toggleVisible(id) {
    setVisibleTodos((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.todo.slice(1).map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          {todo.title && (
            <button onClick={() => toggleVisible(todo.id)}>Add sub Todo</button>
          )}
          {visibleTodos[todo.id] && (
            <React.Fragment>
              <input
                type="text"
                value={subTodoTitle}
                onChange={(e) => setSubTodoTitle(e.target.value)}
                className="border-2 border-black"
              />
              <button onClick={() => subTodoHandler(todo.id)}>Add</button>
            </React.Fragment>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoItems;
