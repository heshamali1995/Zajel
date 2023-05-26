import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authHeader } from "../../services/auth.header";

const initialState = {
  loading: false,
  drivers: [],
  count: null,
  error: null,
};

const URL = process.env.REACT_APP_ADMIN_URL;

const fetchDrivers = createAsyncThunk("drivers/fetchDrivers", async () => {
  return axios.get(`${URL}/v1/drivers`, {
    headers: authHeader(),
  });
});

const driverSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    setFilteredDrivers: (state, action) => {
      state.drivers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrivers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      state.loading = false;
      state.drivers = action.payload.data.drivers.reverse();
      state.count = action.payload.data.drivers.length;
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { setFilteredDrivers } = driverSlice.actions;

export { driverSlice, fetchDrivers, setFilteredDrivers };
