import "./App.css"
import { Header } from "common/components"
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { statusType } from "./app-reducer";
import { LinearProgress } from "@mui/material";
import { Outlet } from "react-router-dom";

export const App = () => {
  const status = useSelector<RootState, statusType>(state => state.app.status)
  return (
    <div>
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'}/> }
      <Outlet/>
    </div>

  )
}
