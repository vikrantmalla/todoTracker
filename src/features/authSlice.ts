import { createSlice } from "@reduxjs/toolkit";
import { ContextData } from "../types/data";
import { TabType } from "../types/enum";

const initialState: ContextData.AuthState = {
  showModal: false,
  openTab: TabType.logIn,
  showForgetPasswordModal: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
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
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const {
  setShowModal,
  setOpenTab,
  setShowForgetPasswordModal,
  setCredentials,
} = auth.actions;
export default auth.reducer;
