import "./App.css";
import { Header } from "common/components";
import {LinearProgress } from "@mui/material";
import {Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { initializeAppTC } from "../fuetures/auth/model/auth-reducer";
import { selectIsInitialized } from "../fuetures/auth/model/selectIsInitialized";
import { Preloader } from "common/components/Preloader/Preloader";

export const App = () => {
  const status = useAppSelector(state => state.app.status);
  const isInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  return (
    <div>
      {!isInitialized ? <Preloader/> : <>
        <Header />
        {status === "loading" && <LinearProgress color={"primary"} />}
        <Outlet />
      </>}

    </div>

  );
};
