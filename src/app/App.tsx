import "./App.css";
import { Header } from "common/components";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Preloader } from "common/components/Preloader/Preloader";
import { selectAppError, selectAppStatus, setAppError, setIsLoggedIn } from "./model/appSlice";
import { useMeQuery } from "../fuetures/auth/api/auth-api";
import { useToast } from "common/components/Toast/ToastContainer";
import { ResultCode } from "common/enums/resultCodeEnum";


export const App = () => {
  const status = useAppSelector(selectAppStatus);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const appError = useAppSelector(selectAppError);
  const toast = useToast();
  if (appError) {
    toast.error(appError, "left-bottom", () => {
      dispatch(setAppError({ error: null }));
    });
  }
  const { data, isLoading } = useMeQuery();
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    }
  }, [isLoading, data, status]);

  return (

    <div>

      {!isInitialized ? <Preloader /> : <>
        <Header />
        <Outlet />
      </>}
    </div>

  );
};
