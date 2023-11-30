"use client";
import { configureStore } from "@reduxjs/toolkit";
import { reducer as appReducer } from "./slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    // Add other reducers as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredPaths: [
          "payload.0.publicKey",
          "app.orders.0.publicKey",
          "payload.publicKey",
        ],
      },
    }),
});

export default store;
