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
import { setOnHold, removeProgress } from "../features/todoSlice";
function ProgressBody({ progress }) {
  const onHold = useSelector((state) => state.todoReducer.onHold);
  const [position, setPosition] = useState("bottom");
  const path = ["New", "On Hold", "Completed", "Closed"];
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (location === "On Hold") {
      onHoldHandler();
      dispatch(removeProgress(progress.id));
    }
    console.log(location);
  }, [location, dispatch]);
  function 
  onHoldHandler() {
    const onHoldData = Array.isArray(onHold)
      ? [...onHold, progress]
      : [progress];
    dispatch(setOnHold(onHoldData));
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
