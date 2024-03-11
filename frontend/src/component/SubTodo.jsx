import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSubTodo } from "../features/todoSlice";
import SubTodoBody from "./SubTodoBody";
function SubTodo() {
  const todos = useSelector((state) => state.todoReducer);
  const [subTodoDiscription, setSubTodoDiscription] = useState("");

  const dispatch = useDispatch();
  function updateTodoHandler(id) {
    dispatch(
      updateSubTodo({
        id: id,
        discription: subTodoDiscription,
      })
    );
    setSubTodoDiscription("");
  }
  return (
    <div>
      {todos.todo.slice(1).map((todo) => (
        <div key={todo.id} className="flex flex-col gap-2">
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
                    required
                    value={subTodoDiscription}
                    onChange={(e) => setSubTodoDiscription(e.target.value)}
                  />
                  <SubTodoBody subTodo={subTodo} />
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
    </div>
  );
}
export default SubTodo;
