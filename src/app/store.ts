import { configureStore } from "@reduxjs/toolkit";
import {  appReducer, appSlice } from "./model/appSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./model/base-api";


export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;