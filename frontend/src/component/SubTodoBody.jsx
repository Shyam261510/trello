import {
  setProgress,
  removeSubTodo,
  setOnHold,
  setCompleted,
  setClosed,
} from "../features/todoSlice";
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
  const progress = useSelector((state) =>
    state.todoReducer.todo
      .flatMap((todo) => (Array.isArray(todo.progress) ? todo.progress : []))
      .filter(Boolean)
  );
  const onHold = useSelector((state) =>
    state.todoReducer.todo
      .flatMap((todo) => (Array.isArray(todo.onHold) ? todo.onHold : []))
      .filter(Boolean)
  );
  const completed = useSelector((state) =>
    state.todoReducer.todo
      .flatMap((todo) => (Array.isArray(todo.completed) ? todo.completed : []))
      .filter(Boolean)
  );
  const closed = useSelector((state) =>
    state.todoReducer.todo
      .flatMap((todo) => (Array.isArray(todo.closed) ? todo.closed : []))
      .filter(Boolean)
  );
  const [position, setPosition] = useState("bottom");
  const path = ["Progrees", "On Hold", "Completed", "Closed"];
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  function progressHandler() {
    const existsInProgress = progress.some((item) => item.id === subTodo.id);

    if (!existsInProgress) {
      const progressData = Array.isArray(progress)
        ? [...progress, subTodo]
        : [subTodo];
      dispatch(setProgress(progressData));
      dispatch(removeSubTodo(subTodo.id));
    }
  }

  function onHoldHandler() {
    const existsInonHold = onHold.some((item) => item.id === subTodo.id);
    if (!existsInonHold) {
      const onHoldData = Array.isArray(onHold)
        ? [...onHold, subTodo]
        : [subTodo];
      dispatch(setOnHold(onHoldData));
      dispatch(removeSubTodo(subTodo.id));
    }
  }
  function completedHandler() {
    const existsInCompleted = completed.some((item) => item.id === subTodo.id);
    if (!existsInCompleted) {
      const completedData = Array.isArray(completed)
        ? [...completed, subTodo]
        : [subTodo];
      dispatch(setCompleted(completedData));
      dispatch(removeSubTodo(subTodo.id));
    }
  }
  function closedHandler() {
    const existsInClosed = closed.some((item) => item.id === subTodo.id);
    if (!existsInClosed) {
      const closedData = Array.isArray(closed)
        ? [...closed, subTodo]
        : [subTodo];
      dispatch(setClosed(closedData));
      dispatch(removeSubTodo(subTodo.id));
    }
  }
  useEffect(() => {
    if (location === "Progrees") {
      progressHandler();
    }
    if (location === "On Hold") {
      onHoldHandler();
    }
    if (location === "Completed") {
      completedHandler();
    }
    if (location === "Closed") closedHandler();
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
