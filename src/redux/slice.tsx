// src/store/slice.ts
import { createSelector, createSlice } from "@reduxjs/toolkit";

interface AppState {
  // Define your state here
  appState: Number;
  eventCategories: any;
  orders: any;
  markets: any;
  ecMarkets: any;

  menuList: any;
  upcomings: any;
  sports: any;
  leagues: any;
  games: any;
  bfEmail: any;
}

const initialState: AppState = {
  // Initial state values
  appState: 0,
  eventCategories: [],
  orders: [],
  markets: {},
  ecMarkets: {},
  menuList: {
    popLeagues: [],
    sports: [],
  },
  upcomings: [],
  sports: {},
  leagues: {},
  games: {},
  bfEmail: "",
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

    setOrders(state, action) {
      state.orders = action.payload;
    },

    updateMarket(state, action) {
      const market = action.payload;
      state.markets[market.publicKey] = market;
    },

    updateECMarket(state, action) {
      const market = action.payload;
      state.ecMarkets[market.marketAccount] = market;
    },

    updateMenuList(state, action) {
      state.menuList = action.payload;
    },

    updateUpcomings(state, action) {
      state.upcomings = action.payload;
    },

    updateSport(state, action) {
      state.sports[action.payload.id] = action.payload.sport;
    },

    updateLeague(state, action) {
      state.leagues[action.payload.id] = action.payload.league;
    },

    updateGame(state, action) {
      state.games[action.payload.id] = action.payload.game;
    },

    updateBFEmail(state, action) {
      state.bfEmail = action.payload;
    },
  },
});

export const getAppState = (state: any) => state.app.appState;
export const getEventCategories = (state: any) => state.app.eventCategories;
export const getOrders = (state: any) => state.app.orders;
export const getMarkets = (state: any) => state.app.markets;
export const getECMarkets = (state: any) => state.app.ecMarkets;
export const getMenuList = (state: any) => state.app.menuList;
export const getUpcomings = (state: any) => state.app.upcomings;
export const getSports = (state: any) => state.app.sports;
export const getSportById = (id: string) => {
  return createSelector([getSports], (sportData) => sportData[id]);
};
export const getLeagues = (state: any) => state.app.leagues;
export const getLeagueById = (id: string) => {
  return createSelector([getLeagues], (leagueData) => leagueData[id]);
};
export const getGames = (state: any) => state.app.games;
export const getGameById = (id: string) => {
  return createSelector([getGames], (gameData) => gameData[id]);
};
export const getBFEmail = (state: any) => state.app.bfEmail;

export const {
  activeAppState,
  setEventCategories,
  setOrders,
  updateMarket,
  updateECMarket,
  updateMenuList,
  updateUpcomings,
  updateSport,
  updateLeague,
  updateGame,
  updateBFEmail,
} = appSlice.actions;
export const { actions, reducer } = appSlice;
