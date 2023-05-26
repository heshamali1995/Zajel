import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const textareaSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    createText: (state, action) => {
      const findElement = state.some((elem) => elem.id === action.payload.id);
      if (!findElement) {
        state.push(action.payload);
      } else {
        state.push(action.payload);
        const index = state.findIndex((elem) => elem.id === action.payload.id);
        state.splice(index, 1);
        if (action.payload.notes === "") {
          const index = state.findIndex(
            (elem) => elem.id === action.payload.id
          );
          state.splice(index, 1);
        }
      }
    },
    removeSingleText: (state, action) => {
      state.splice(action.payload, 1);
    },
    removeText: (state) => {
      state.splice(0, state.length);
    },
  },
});

const { createText, removeText, removeSingleText } = textareaSlice.actions;

export { textareaSlice, createText, removeText, removeSingleText };
