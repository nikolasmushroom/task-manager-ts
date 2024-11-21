import "./App.css";
import { Header } from "common/components";
import { LinearProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { initializeAppTC } from "../fuetures/auth/model/auth-reducer";
import { Preloader } from "common/components/Preloader/Preloader";
import { selectIsInitialized } from "../fuetures/auth/model/authSelectors";
import { selectAppStatus } from "./model/selectAppError";

export const App = () => {
  const status = useAppSelector(selectAppStatus);
  const isInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  return (
    <div>
      {!isInitialized ? <Preloader /> : <>
        <Header />
        {status === "loading" && <LinearProgress color={"primary"} style={{
          position: "fixed",
          top: "30",
          left: "0",
          width: "100%",
          height: "4px",
          zIndex: '9999'
        }} />}
        <Outlet />
      </>}

    </div>

  );
};
