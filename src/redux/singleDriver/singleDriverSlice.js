import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authHeader } from "../../services/auth.header";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const URL = process.env.REACT_APP_ADMIN_URL;

const fetchDetails = createAsyncThunk(
  "singleDriver/fetchDetails",
  async (id) => {
    return axios.get(`${URL}/v1/drivers/${id}`, {
      headers: authHeader(),
    });
  }
);

const singleDriverSlice = createSlice({
  name: "details",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { singleDriverSlice, fetchDetails };
