import { configureStore } from "@reduxjs/toolkit";
import { driverSlice } from "./drivers/driverSlice";
import { singleDriverSlice } from "./singleDriver/singleDriverSlice";
import { showModal } from "./showModal/showModal";
import { deleteDriver } from "./deleteDriver/deleteDriver";
import { textareaSlice } from "./textarea/textarea";
import { statusSlice } from "./status/status";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    data: driverSlice.reducer,
    details: singleDriverSlice.reducer,
    modal: showModal.reducer,
    delete: deleteDriver.reducer,
    text: textareaSlice.reducer,
    status: statusSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
