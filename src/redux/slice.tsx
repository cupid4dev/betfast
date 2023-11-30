// src/store/slice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  // Define your state here
  appState: Number;
  eventCategories: any;
  orders: any;
  markets: any;
  ecMarkets: any;
}

const initialState: AppState = {
  // Initial state values
  appState: 0,
  eventCategories: [],
  orders: [],
  markets: {},
  ecMarkets: {},
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
      state.eventCategories.forEach((ec: any) => {
        ec.eventGroup.forEach((eg: any) => {
          eg.events.forEach((ev: any) => {
            ev.markets.forEach((market: any) => {
              state.ecMarkets[market.marketAccount] = {
                ...market,
                eventName: ev.eventName,
                eventStart: ev.eventStart,
                categoryTitle: ev.categoryTitle,
                category: ev.category,
                eventGroupTitle: ev.eventGroupTitle,
                eventGroup: ev.eventGroup,
                eventAccount: ev.eventAccount,
              };
            });
          });
        });
      });
    },

    setOrders(state, action) {
      state.orders = action.payload;
    },

    updateMarket(state, action) {
      const market = action.payload;
      state.markets[market.publicKey] = market;
    },
  },
});

export const getAppState = (state: any) => state.app.appState;
export const getEventCategories = (state: any) => state.app.eventCategories;
export const getOrders = (state: any) => state.app.orders;
export const getMarkets = (state: any) => state.app.markets;
export const getECMarkets = (state: any) => state.app.ecMarkets;

export const { activeAppState, setEventCategories, setOrders, updateMarket } =
  appSlice.actions;
export const { actions, reducer } = appSlice;
