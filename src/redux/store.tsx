"use client";
import { configureStore } from "@reduxjs/toolkit";
import { reducer as appReducer } from "./slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    // Add other reducers as needed
  },
});

export default store;
