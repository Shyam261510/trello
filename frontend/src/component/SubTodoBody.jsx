import { setProgress, removeSubTodo } from "../features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
function SubTodoBody({ subTodo }) {
  const progress = useSelector((state) => state.todoReducer.progress);
  const [position, setPosition] = useState("bottom");
  const path = ["Progrees", "On Hold", "Completed", "Closed"];
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  function progressHandler(id) {
    const progressData = Array.isArray(progress)
      ? [...progress, subTodo]
      : [subTodo];
    dispatch(setProgress(progressData));
  }
  useEffect(() => {
    if (location === "Progrees") {
      progressHandler();
      dispatch(removeSubTodo(subTodo.id));
    }
    console.log(location);
  }, [location, subTodo, dispatch]);

  return (
    <div>
      <h2>{subTodo.discription}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button variant="outline">Move </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {path.map((path) => (
              <DropdownMenuRadioItem
                onClick={() => setLocation(path)}
                key={path}
              >
                {path}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SubTodoBody;
