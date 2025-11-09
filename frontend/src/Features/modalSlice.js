import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalType: null,
    modalData:null
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
    },
    addData:(state , action)=>{
      state.modalData = action.payload
    }
  },
});

export const { openModal, closeModal , addData} = modalSlice.actions;
export default modalSlice.reducer;
