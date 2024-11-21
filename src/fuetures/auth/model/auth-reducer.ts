import { authAPI, LoginParams } from "../api/auth-api";
import { ResultCode } from "../../todolists/api/tasks-api";
import { setAppStatusAC } from "../../../app/model/app-reducer";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";
import { clearTasksData } from "../../../model/tasks-reducer";
import { clearTodolistsData } from "../../todolists/model/todolists-reducer";
import { AppDispatch } from "../../../app/store";

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  captchaUrl: ""
};
type InitialStateType = typeof initialState
export const authReducer = (state: InitialStateType = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case "AUTH/SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    case "AUTH/SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    case "AUTH/SET_CAPTCHA_URL":
      return { ...state, captchaUrl: action.captchaUrl };
    default:
      return state;
  }
};
const setIsLoggedIn = (isLoggedIn: boolean) => {
  return { type: "AUTH/SET_IS_LOGGED_IN", isLoggedIn } as const;
};
const setIsInitialized = (isInitialized: boolean) => {
  return { type: "AUTH/SET_IS_INITIALIZED", isInitialized } as const;
};
const setCaptchaUrl = (captchaUrl: string) => {
  return { type: "AUTH/SET_CAPTCHA_URL", captchaUrl } as const;
};
export const loginTC = (params: LoginParams) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI.login(params).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn(true));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setCaptchaUrl(""));
      localStorage.setItem("sn-token", response.data.data.token);
    } else if (response.data.resultCode === ResultCode.Captcha) {
      dispatch(getCaptchaTC());
      handlerServerAppError(response.data, dispatch);
      dispatch(setAppStatusAC("failed"));
    } else {
      handlerServerAppError(response.data, dispatch);
      dispatch(setAppStatusAC("failed"));
    }
  }).catch((error) => {
    handlerServerNetworkError(error, dispatch);
    dispatch(setAppStatusAC("failed"));
  });
};
export const getCaptchaTC = () => (dispatch: AppDispatch) => {
  authAPI.getCaptcha().then((response) => {
    dispatch(setCaptchaUrl(response.data.url));
  });
};
export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI.logout().then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setIsLoggedIn(false));
      dispatch(clearTasksData());
      dispatch(clearTodolistsData());
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
  return (dispatch: AppDispatch) => {
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
  ReturnType<typeof setIsInitialized> |
  ReturnType<typeof setCaptchaUrl>

