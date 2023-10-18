import { configureStore } from "@reduxjs/toolkit";
import showSlice from "./showSlice";

const store = configureStore({
  reducer: {
    shows: showSlice,
  },
});

export default store;
