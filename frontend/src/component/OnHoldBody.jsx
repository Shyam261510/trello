import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  removeOnHold,
  setProgress,
  setCompleted,
  setClosed,
} from "../features/todoSlice";
function OnHoldBody({ onHold }) {
  const [position, setPosition] = useState("bottom");

  const path = ["Progress", "Completed", "Closed"];
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const progress = useSelector((state) =>
    state.todoReducer.todo.flatMap((todo) =>
      Array.isArray(todo.progress) ? todo.progress : []
    )
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
  useEffect(() => {
    if (location === "Progress") {
      onProgressHandler();
    }
    if (location === "Completed") {
      CompleteHandler();
    }
    if (location === "Closed") closeHandler();
  }, [location, dispatch]);
  function onProgressHandler() {
    const progressData = Array.isArray(progress)
      ? [...progress, onHold]
      : [onHold];
    dispatch(setProgress(progressData));
    dispatch(removeOnHold(onHold.id));
  }
  function CompleteHandler() {
    const completedData = Array.isArray(completed)
      ? [...completed, onHold]
      : [onHold];
    dispatch(setCompleted(completedData));
    dispatch(removeOnHold(onHold.id));
  }
  function closeHandler() {
    const closedData = Array.isArray(closed) ? [...closed, onHold] : [onHold];
    dispatch(setClosed(closedData));
    dispatch(removeOnHold(onHold.id));
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
export default OnHoldBody;
