// src/store/slice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  // Define your state here
  appState: Number;
  eventCategories: any;
}

const initialState: AppState = {
  // Initial state values
  appState: 0,
  eventCategories: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Define your actions and reducers here
    activeAppState(state, action) {
      state.appState = action.payload;
    },

    setEventCategories(state, action) {
      state.eventCategories = action.payload;
      state.eventCategories.sort((a: any, b: any) => {
        if (a.id == "CSGO") {
          return 1;
        }
        if (b.id == "CSGO") {
          return -1;
        }
        return a.displayPriority > b.displayPriority ? -1 : 1;
      });
    },
  },
});

export const getAppState = (state: any) => state.app.appState;
export const getEventCategories = (state: any) => state.app.eventCategories;

export const { activeAppState } = appSlice.actions;
export const { setEventCategories } = appSlice.actions;

export const { actions, reducer } = appSlice;
