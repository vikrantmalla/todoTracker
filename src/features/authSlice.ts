import { createSlice } from "@reduxjs/toolkit";
import { ContextData } from "../types/data";

const initialState: ContextData.AuthState = {
  showModal: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = auth.actions;
export default auth.reducer;
