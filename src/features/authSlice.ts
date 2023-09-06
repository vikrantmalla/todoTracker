import { createSlice } from "@reduxjs/toolkit";
import { ContextData } from "../types/data";
import { TabType } from "../types/enum";

const initialState: ContextData.AuthState = {
  showModal: false,
  openTab: TabType.logIn,
  showForgetPasswordModal: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setOpenTab: (state, action) => {
      state.openTab = action.payload;
    },
    setShowForgetPasswordModal: (state, action) => {
      state.showForgetPasswordModal = action.payload;
    },
  },
});

export const { setShowModal, setOpenTab, setShowForgetPasswordModal } =
  auth.actions;
export default auth.reducer;
