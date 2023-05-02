import { configureStore } from "@reduxjs/toolkit";
import { driverSlice } from "./drivers/driverSlice";
import { singleDriverSlice } from "./singleDriver/singleDriverSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    data: driverSlice.reducer,
    details: singleDriverSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
