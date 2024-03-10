import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubTodo } from "../features/todoSlice";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
function TodoItems() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const [subTodoTitle, setSubTodoTitle] = useState("");
  // State to track visibility of input field and button for each todo
  const [visibleTodos, setVisibleTodos] = useState({});

  function subTodoHandler(id) {
    dispatch(addSubTodo({ id: id, title: subTodoTitle }));
    setSubTodoTitle("");
    // Reset visibility for this todo after adding sub todo
    setVisibleTodos((prevState) => ({ ...prevState, [id]: false }));
  }

  function toggleVisible(id) {
    setVisibleTodos((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }

  return (
    <React.Fragment>
      {todos.todo.slice(1).map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          {todo.title && (
            <button onClick={() => toggleVisible(todo.id)}>Add sub Todo</button>
          )}
          {visibleTodos[todo.id] && (
            <React.Fragment>
              <input
                type="text"
                value={subTodoTitle}
                onChange={(e) => setSubTodoTitle(e.target.value)}
                className="border-2 border-black"
              />
              <button onClick={() => subTodoHandler(todo.id)}>Add</button>
            </React.Fragment>
          )}

          {todo.subTodo.map((subTodo) => (
            <div key={subTodo.id}>
              <h2 onClick={handleOpen}>{subTodo.title}</h2>
              <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
              >
                <Card className="mx-auto w-full max-w-[24rem]">
                  <CardBody className="flex flex-col gap-4">
                    <Typography variant="h4" color="blue-gray">
                      Sign In
                    </Typography>
                    <Typography
                      className="mb-3 font-normal"
                      variant="paragraph"
                      color="gray"
                    >
                      Enter your email and password to Sign In.
                    </Typography>
                    <Typography className="-mb-2" variant="h6">
                      Your Email
                    </Typography>
                    <Input label="Email" size="lg" />
                    <Typography className="-mb-2" variant="h6">
                      Your Password
                    </Typography>
                    <Input label="Password" size="lg" />
                    <div className="-ml-2.5 -mt-3">
                      <Checkbox label="Remember Me" />
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleOpen} fullWidth>
                      Sign In
                    </Button>
                    <Typography
                      variant="small"
                      className="mt-4 flex justify-center"
                    >
                      Don&apos;t have an account?
                      <Typography
                        as="a"
                        href="#signup"
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold"
                        onClick={handleOpen}
                      >
                        Sign up
                      </Typography>
                    </Typography>
                  </CardFooter>
                </Card>
              </Dialog>
            </div>
          ))}
        </div>
      ))}
    </React.Fragment>
  );
}

export default TodoItems;
