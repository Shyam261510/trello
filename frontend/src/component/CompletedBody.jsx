import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  removeCompleted,
  setProgress,
  setOnHold,
  setClosed,
} from "../features/todoSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
function CompletedBody({ completed }) {
  const [position, setPosition] = useState("bottom");
  const path = ["Progress", "On Hold", "Closed"];
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const progress = useSelector((state) =>
    state.todoReducer.todo.flatMap((todo) =>
      Array.isArray(todo.progress) ? todo.progress : []
    )
  );
  const onHold = useSelector((state) =>
    state.todoReducer.todo
      .flatMap((todo) => (Array.isArray(todo.onHold) ? todo.onHold : []))
      .filter(Boolean)
  );
  const closed = useSelector((state) =>
    state.todoReducer.todo
      .flatMap((todo) => (Array.isArray(todo.closed) ? todo.closed : []))
      .filter(Boolean)
  );
  useEffect(() => {
    if (location === "Progress") {
      progressHandler();
    }
    if (location === "On Hold") {
      onHoldHandler();
    }
    if (location === "Closed") closeHandler();
  }, [location, dispatch]);
  function progressHandler() {
    const progressData = Array.isArray(progress)
      ? [...progress, completed]
      : [completed];
    dispatch(setProgress(progressData));
    dispatch(removeCompleted(completed.id));
  }
  function onHoldHandler() {
    const onHoldData = Array.isArray(onHold)
      ? [...onHold, completed]
      : [completed];
    dispatch(setOnHold(onHoldData));
    dispatch(removeCompleted(completed.id));
  }

  function closeHandler() {
    const closedData = Array.isArray(closed)
      ? [...closed, completed]
      : [completed];
    dispatch(setClosed(closedData));
    dispatch(removeCompleted(completed.id));
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
export default CompletedBody;
