import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { ContextData } from "../types/data";

const initialState: ContextData.TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: ContextData.Todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; newText: string }>
    ) => {
      const { id, newText } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].text = newText;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
