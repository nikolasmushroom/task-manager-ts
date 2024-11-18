import { authAPI, LoginParams } from "../api/auth-api";
import { ResultCode } from "../../todolists/api/tasks-api";
import { Dispatch } from "redux";
import { setAppStatusAC } from "../../../app/model/app-reducer";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";

const initialState = {
  isLoggedIn: false,
  isInitialized: false
};
type InitialStateType = typeof initialState
export const authReducer = (state: InitialStateType = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    case "SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};
const setIsLoggedIn = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", isLoggedIn } as const;
};
const setIsInitialized = (isInitialized: boolean) => {
  return { type: "SET_IS_INITIALIZED", isInitialized } as const;
};
export const loginTC = (params: LoginParams) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI.login(params).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn(true));
      dispatch(setAppStatusAC("succeeded"));
      localStorage.setItem("sn-token", response.data.data.token);
    } else {
      handlerServerAppError(response.data, dispatch);
      dispatch(setAppStatusAC("failed"));
    }
  }).catch((error) => {
    handlerServerNetworkError(error, dispatch);
    dispatch(setAppStatusAC("failed"));
  });
};
export const logoutTC = () => (dispatch: Dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn(false));
      localStorage.removeItem("sn-token");
    } else {
      handlerServerAppError(response.data, dispatch);
      dispatch(setAppStatusAC("failed"));
    }
  }).catch((error) => {
    handlerServerNetworkError(error, dispatch);
    dispatch(setAppStatusAC("failed"));
  });
};

export const initializeAppTC = () => {
  return (dispatch: any) => {
    let promise = authAPI.authMe().then((response) => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn(true));
      } else {
        handlerServerAppError(response.data, dispatch);
        dispatch(setAppStatusAC("failed"));
      }
      Promise.all([promise])
        .then(() => {
          dispatch(setIsInitialized(true));
        });
    }).catch((error) => {
      handlerServerNetworkError(error, dispatch);
      dispatch(setAppStatusAC("failed"));
    });
  };
};
export type AuthActionTypes =
  ReturnType<typeof setIsLoggedIn> |
  ReturnType<typeof setIsInitialized>

