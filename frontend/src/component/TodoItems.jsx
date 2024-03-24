import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubTodo, removeData } from "../features/todoSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

function TodoItems() {
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const [subTodoTitle, setSubTodoTitle] = useState({});
  const [position, setPosition] = useState("bottom");
  // State to track visibility of input field and button for each todo
  const [visibleTodos, setVisibleTodos] = useState({});

  function subTodoHandler(id) {
    dispatch(
      addSubTodo({
        id: id,
        title: subTodoTitle[id], // Use the specific sub-todo title
      })
    );
    // Reset the specific sub-todo title
    setSubTodoTitle((prevState) => ({ ...prevState, [id]: "" }));
    setVisibleTodos((prevState) => ({ ...prevState, [id]: false }));
  }

  function toggleVisible(id) {
    setVisibleTodos((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }
  function handleSubTodoTitleChange(id, event) {
    setSubTodoTitle((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  }
  function handelRemove(id) {
    dispatch(removeData(id));
  }
  return (
    <>
      {todos.todo.length > 1 && (
        <div className="flex flex-col gap-3 ">
          {todos.todo.slice(1).map((todo) => (
            <div
              key={todo.id}
              className="relative bg-[#F0F3FA]  p-5 rounded-lg shadow-[4px_6px_20px_12px_#cbd5e0]"
            >
              <h2 className="font-semibold text-lg  text-[#343434] ">
                {todo.title}
              </h2>
              {todo.title && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      variant="outline"
                      className="absolute top-0 right-4 "
                    >
                      ...
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={setPosition}
                    >
                      <DropdownMenuRadioItem>
                        <button
                          onClick={() => toggleVisible(todo.id)}
                          className="text-[#343434] font-semibold text-md hover:text-[#585757] list-none"
                        >
                          Add
                        </button>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem>
                        <button
                          onClick={() => handelRemove(todo.id)}
                          className="text-[#343434] font-semibold text-md hover:text-[#585757] list-none"
                        >
                          Remove
                        </button>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {visibleTodos[todo.id] && (
                <div className="flex flex-col gap-2 ">
                  <input
                    type="text"
                    value={subTodoTitle[todo.id] || ""} // Use the specific sub-todo title
                    onChange={(e) => handleSubTodoTitleChange(todo.id, e)}
                    className="p-1"
                    placeholder="Add title...."
                  />
                  <button
                    onClick={() => subTodoHandler(todo.id)}
                    className="bg-[#343434] text-[#F0F3FA] p-[2px] rounded-md duration-100 hover:bg-[#1a1818] hover:font-semibold"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TodoItems;
