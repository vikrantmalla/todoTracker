import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "../features/todoSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
