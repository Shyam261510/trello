import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todo: [
    {
      id: "",
      title: "",
      subTodo: [
        {
          id: "",
          title: "",
          discription: "",
        },
      ],
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todo = [
        ...state.todo,
        {
          id: nanoid(),
          title: action.payload.title,
          subTodo: [],
        },
      ];
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
    updateSubTodo: (state, action) => {
      const { id, discription } = action.payload;
      const updatedTodos = state.todo.map((todo) => {
        return {
          ...todo,
          subTodo: todo.subTodo.map((subTodo) => {
            if (id === subTodo.id) {
              return {
                ...subTodo,
                discription: discription,
              };
            }
            return subTodo;
          }),
        };
      });
      state.todo = updatedTodos;
    },
  },
});

export const { addTodo, addSubTodo, updateSubTodo } = todoSlice.actions;

export default todoSlice.reducer;
