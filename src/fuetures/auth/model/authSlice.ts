import { authAPI, LoginParams } from "../api/auth-api";
import { ResultCode } from "../../todolists/api/tasks-api";
import { setAppStatus } from "../../../app/model/appSlice";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";
import { clearTasksData } from "../../todolists/model/tasksSlice";
import { clearTodolistsData } from "../../todolists/model/todolistsSlice";
import { AppDispatch } from "../../../app/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  captchaUrl: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsInitialized: state => state.isInitialized,
    selectCaptchaUrl: state => state.captchaUrl
  },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized;
    }),
    setCaptchaUrl: create.reducer<{ captchaUrl: string }>((state, action) => {
      state.captchaUrl = action.payload.captchaUrl;
    })
  }),
});


// Action creators are generated for each case reducer function
export const { selectIsLoggedIn, selectIsInitialized, selectCaptchaUrl } = authSlice.selectors
export const { setIsLoggedIn, setIsInitialized, setCaptchaUrl } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const loginTC = (params: LoginParams) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status : 'loading' }));
  authAPI.login(params).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({isLoggedIn :  true }));
      dispatch(setAppStatus({ status : 'succeeded' }));
      dispatch(setCaptchaUrl({captchaUrl :  "" }));
      localStorage.setItem("sn-token", response.data.data.token);
    } else if (response.data.resultCode === ResultCode.Captcha) {
      dispatch(getCaptchaTC());
      handlerServerAppError(response.data, dispatch);
      dispatch(setAppStatus({ status : 'failed' }));
    } else {
      handlerServerAppError(response.data, dispatch);
      dispatch(setAppStatus({ status : 'failed' }));
    }
  }).catch((error) => {
    handlerServerNetworkError(error, dispatch);
    dispatch(setAppStatus({ status : 'failed' }));
  });
};
export const getCaptchaTC = () => (dispatch: AppDispatch) => {
  authAPI.getCaptcha().then((response) => {
    dispatch(setCaptchaUrl({captchaUrl :  response.data.url }));
  });
};
export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status : 'loading' }));
  authAPI.logout().then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status : 'succeeded' }));
      dispatch(setIsLoggedIn({ isLoggedIn : false }));
      dispatch(clearTasksData());
      dispatch(clearTodolistsData());
      localStorage.removeItem("sn-token");
    } else {
      handlerServerAppError(response.data, dispatch);
      dispatch(setAppStatus({ status : 'failed' }));
    }
  }).catch((error) => {
    handlerServerNetworkError(error, dispatch);
    dispatch(setAppStatus({ status : 'failed' }));
  });
};

export const initializeAppTC = () => {
  return (dispatch: AppDispatch) => {
    let promise = authAPI.authMe().then((response) => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({isLoggedIn :  true }));
      } else {
        handlerServerAppError(response.data, dispatch);
        dispatch(setAppStatus({ status : 'failed' }));
      }
      Promise.all([promise])
        .then(() => {
          dispatch(setIsInitialized({isInitialized :  true }));
        });
    }).catch((error) => {
      handlerServerNetworkError(error, dispatch);
      dispatch(setAppStatus({ status : 'failed' }));
    });
  };
};


