// src/store/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  // Define your state here
  appState: Number,
}

const initialState: AppState = {
  // Initial state values
  appState: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Define your actions and reducers here
    activeAppState(state, action) {
        state.appState = action.payload;
    },
  },
});

export const { activeAppState } = appSlice.actions;

export const getAppState = (state: AppState) => state.app.appState;
export const { actions, reducer } = appSlice;