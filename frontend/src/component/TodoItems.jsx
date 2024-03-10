import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubTodo, updateSubTodo } from "../features/todoSlice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function TodoItems() {
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const [subTodoTitle, setSubTodoTitle] = useState("");
  const [subTodoDiscription, setSubTodoDiscription] = useState("");
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
  function updateTodoHandler(id) {
    dispatch(
      updateSubTodo({
        id: id,
        discription: subTodoDiscription,
      })
    );
  }
  return (
    <React.Fragment>
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

          {todo.subTodo.map((subTodo) => (
            <div key={subTodo.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <button>{subTodo.title}</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle># {subTodo.id}</DialogTitle>
                    <DialogDescription>
                      <h2>{subTodo.title}</h2>
                    </DialogDescription>
                  </DialogHeader>
                  <input
                    type="text"
                    placeholder="enter discription...."
                    value={subTodoDiscription}
                    onChange={(e) => setSubTodoDiscription(e.target.value)}
                  />
                  <DialogFooter>
                    <button onClick={() => updateTodoHandler(subTodo.id)}>
                      Add
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      ))}
    </React.Fragment>
  );
}

export default TodoItems;
