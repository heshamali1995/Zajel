import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleted: null,
};

const deleteDriver = createSlice({
  name: "delete",
  initialState,
  reducers: {
    deleteOne: (state, action) => {
      state.deleted = action.payload;
    },
  },
});

const { deleteOne } = deleteDriver.actions;

export { deleteOne, deleteDriver };
