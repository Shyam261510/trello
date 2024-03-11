import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setOnHold } from "../features/todoSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProgressBody from "./ProgressBody";

function Progress() {
  const progress = useSelector((state) => state.todoReducer.progress);

  return (
    <div>
      <h2>PROGRESS</h2>
      {progress.map((todo) => (
        <div key={todo.id}>
          <Dialog>
            <DialogTrigger asChild>
              <button>{todo.title}</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle># {todo.id}</DialogTitle>
                <DialogDescription>
                  <h2>{todo.title}</h2>
                </DialogDescription>
              </DialogHeader>
              <ProgressBody progress={todo} />
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
export default Progress;
