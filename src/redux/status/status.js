import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    createStatus: (state, action) => {
      const findElement = state.some((elem) => elem.id === action.payload.id);
      if (!findElement) {
        state.push(action.payload);
      } else {
        state.push(action.payload);
        const index = state.findIndex((elem) => elem.id === action.payload.id);
        state.splice(index, 1);
      }
    },
    removeSingleStatus: (state, action) => {
      state.splice(action.payload, 1);
    },
    removeStatus: (state) => {
      state.splice(0, state.length);
    },
  },
});

const { createStatus, removeStatus, removeSingleStatus } = statusSlice.actions;

export { statusSlice, createStatus, removeStatus, removeSingleStatus };
