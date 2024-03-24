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
      completed: [],
      closed: [],
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
                paretID:todo.id,
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

      state.todo.map((todo) => {
        todo.progress = [...new Set(progressData)];
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

      state.todo.map((todo) => {
        todo.onHold = [...new Set(onHoldData)];
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
    },
    removeOnHold: (state, action) => {
      const onHoldIdToRemove = action.payload;
      const updatedTodo = state.todo.map((todo) => {
        return {
          ...todo,
          onHold: todo.onHold.filter(
            (progress) => progress.id !== onHoldIdToRemove
          ),
        };
      });
      state.todo = updatedTodo;
    },
    setCompleted: (state, action) => {
      const completedData = action.payload;

      state.todo.map((todo) => {
        todo.completed = [...new Set(completedData)];
      });
    },
    removeCompleted: (state, action) => {
      const completedIdToRemove = action.payload;
      const updatedTodo = state.todo.map((todo) => {
        return {
          ...todo,
          completed: todo.completed.filter(
            (completed) => completed.id !== completedIdToRemove
          ),
        };
      });
      state.todo = updatedTodo;
    },
    setClosed: (state, action) => {
      const closedData = action.payload;
      state.todo.map((todo) => {
        todo.closed = [...new Set(closedData)];
      });
    },
    removeClosed: (state, action) => {
      const id = action.payload;
      const updatedTodo = state.todo.map((todo) => {
        return {
          ...todo,
          closed: todo.closed
            ? todo.closed.filter((closed) => closed.id !== id)
            : [],
        };
      });
      state.todo = updatedTodo;
    },
    removeData: (state, action) => {
      const id = action.payload;
      state.todo = state.todo.filter((todo) => todo.id !== id);
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
  removeOnHold,
  setCompleted,
  removeCompleted,
  setClosed,
  removeClosed,
  removeData,
} = todoSlice.actions;

export default todoSlice.reducer;
