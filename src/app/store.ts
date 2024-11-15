import { combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux'
import { tasksReducer } from '../model/tasks-reducer'
import { todolistsReducer } from '../model/todolists-reducer'
import { AppActionTypes, appReducer } from "./app-reducer";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))


export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionTypes
>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActionTypes
>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store