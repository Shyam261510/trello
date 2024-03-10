import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todo: [
    {
      id: "",
      title: "",
      subTodo: [],
      
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload.title,
        subTodo: [],
      };
      state.todo.push(todo);
    },
    addSubTodo: (state, action) => {
      const { id, title } = action.payload;
      const updatedTodos = state.todo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            subTodo: [
              ...todo.subTodo,
              {
                id: nanoid(),
                title: title,
              },
            ],
            
          };
        }
        return todo;
      });
      state.todo = updatedTodos;
    },
    
  },
});

export const { addTodo, addSubTodo } = todoSlice.actions;

export default todoSlice.reducer;
