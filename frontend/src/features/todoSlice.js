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
      progress: [],
      onHold: [],
    },
  ],
  progress: [],
  onHold: [],
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
    setProgress: (state, action) => {
      const progressData = action.payload;
      state.progress = progressData;
      state.todo.map((todo) => {
        todo.progress = [...progressData];
      });
    },
    removeSubTodo: (state, action) => {
      const updatedTodo = state.todo.map((todo) => {
        return {
          ...todo,
          subTodo: todo.subTodo.filter(
            (subTodo) => subTodo.id !== action.payload
          ),
        };
      });
      state.todo = updatedTodo;
    },
    setOnHold: (state, action) => {
      const onHoldData = action.payload;
      state.onHold = onHoldData;
      state.todo.map((todo) => {
        todo.onHold = [...onHoldData];
      });
    },
    removeProgress: (state, action) => {
      const progressIdToRemove = action.payload;
      const updatedTodo = state.todo.map((todo) => {
        return {
          ...todo,
          progress: todo.progress.filter(
            (progress) => progress.id !== progressIdToRemove
          ),
        };
      });
      state.todo = updatedTodo;
      state.progress = state.progress.filter(
        (progress) => progress.id !== progressIdToRemove
      );
    },
  },
});

export const {
  addTodo,
  addSubTodo,
  updateSubTodo,
  setProgress,
  removeSubTodo,
  setOnHold,
  removeProgress,
} = todoSlice.actions;

export default todoSlice.reducer;
