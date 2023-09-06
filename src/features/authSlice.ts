import { createSlice } from "@reduxjs/toolkit";
import { ContextData } from "../types/data";

const initialState: ContextData.AuthState = {
  showModal: false,
  showForgetPasswordModal: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setShowForgetPasswordModal: (state, action) => {
      state.showForgetPasswordModal = action.payload;
    },
  },
});

export const { setShowModal, setShowForgetPasswordModal } = auth.actions;
export default auth.reducer;
