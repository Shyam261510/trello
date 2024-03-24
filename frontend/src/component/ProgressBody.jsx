import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setOnHold,
  removeProgress,
  setCompleted,
  setClosed,
} from "../features/todoSlice";
function ProgressBody({ progress }) {
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
  const path = ["On Hold", "Completed", "Closed"];
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (location === "On Hold") {
      onHoldHandler();
    }
    if (location === "Completed") {
      completedHandler();
    }
    if (location === "Closed") closedHandler();
  }, [location, dispatch]);
  function completedHandler() {
    const existsInCompleted = completed.some((item) => item.id === progress.id);
    if (!existsInCompleted) {
      const completedData = Array.isArray(completed)
        ? [...completed, progress]
        : [progress];
      dispatch(setCompleted(completedData));
      dispatch(removeProgress(progress.id));
    }
  }
  function onHoldHandler() {
    const existsInonHold = onHold.some((item) => item.id === progress.id);
    if (!existsInonHold) {
      const onHoldData = Array.isArray(onHold)
        ? [...onHold, progress]
        : [progress];
      dispatch(setOnHold(onHoldData));
      dispatch(removeProgress(progress.id));
    }
  }
  function closedHandler() {
    const existsInClosed = closed.some((item) => item.id === progress.id);
    if (!existsInClosed) {
      const closedData = Array.isArray(closed)
        ? [...closed, progress]
        : [progress];
      dispatch(setClosed(closedData));
      dispatch(removeProgress(progress.id));
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button variant="outline">Move </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {path.map((path) => (
            <DropdownMenuRadioItem onClick={() => setLocation(path)} key={path}>
              {path}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ProgressBody;
