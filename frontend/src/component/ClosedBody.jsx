import {
  setCompleted,
  removeClosed,
  setProgress,
  setOnHold,
} from "../features/todoSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function ClosedBody({ closed }) {
  const path = ["Completed", "Progress", "On Hold"];
  const [position, setPosition] = useState("bottom");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const completed = useSelector((state) =>
    state.todoReducer.todo
      .flatMap((todo) => (Array.isArray(todo.completed) ? todo.completed : []))
      .filter(Boolean)
  );
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
  useEffect(() => {
    if (location === "Completed") completedHandler();
    if (location === "On Hold") onHoldHandler();

    if (location === "Progress") progressHandler();
  }, [location, dispatch]);
  function completedHandler() {
    const completedData = Array.isArray(completed)
      ? [...completed, closed]
      : [closed];
    dispatch(setCompleted(completedData));
    dispatch(removeClosed(closed.id));
  }
  function progressHandler() {
    const progressData = Array.isArray(progress)
      ? [...progress, closed]
      : [closed];
    dispatch(setProgress(progressData));
    dispatch(removeClosed(closed.id));
  }
  function onHoldHandler() {
    const onHoldData = Array.isArray(onHold) ? [...onHold, closed] : [closed];
    dispatch(setOnHold(onHoldData));
    dispatch(removeClosed(closed.id));
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button variant="outline">Move </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              {path.map((path) => (
                <DropdownMenuRadioItem
                  onClick={() => setLocation(path)}
                  key={path}
                >
                  {path}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default ClosedBody;
