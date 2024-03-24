import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CompletedBody from "./CompletedBody";
function Completed() {
  const todos = useSelector((state) => state.todoReducer);
  return (
    <div>
      <h2 className="text-[#343434] font-semibold text-lg text-center">
        Completed
      </h2>
      {todos.todo.slice(1).map((todo) => (
        <div key={todo.id}>
          {Array.isArray(todo.completed) &&
            todo.completed.map((data) => (
              <div key={data.id}>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex flex-col gap-2 bg-[#F0F3FA] mt-3 p-5 rounded-lg shadow-[4px_6px_20px_12px_#cbd5e0] w-[13rem] h-[4rem] text-lg text-center font-semibold">
                      {data.title}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle># {data.id}</DialogTitle>
                      <DialogDescription>
                        <h2>{data.title}</h2>
                      </DialogDescription>
                    </DialogHeader>
                    <CompletedBody completed={data} />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
export default Completed;
