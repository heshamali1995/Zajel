import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};
const showModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.show = !state.show;
    },
  },
});

const { toggleModal } = showModal.actions;

export { toggleModal, showModal };
