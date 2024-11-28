import { ThunkAction, thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { AppActionTypes, appReducer, appSlice } from "./model/appSlice";
import { tasksReducer, tasksSlice } from "../fuetures/todolists/model/tasksSlice";

import { authReducer, authSlice } from "../fuetures/auth/model/authSlice";
import { todolistsReducer, todolistsSlice } from "../fuetures/todolists/model/todolistsSlice";
import { todolistsApi } from "../fuetures/todolists/api/todolists-api";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todolistsApi.middleware),
});
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActionTypes
>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;