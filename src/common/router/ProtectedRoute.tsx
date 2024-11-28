import React, { ReactNode } from "react";
import {Navigate} from "react-router-dom"
import { useAppSelector } from "common/hooks";
import { selectIsLoggedIn } from "../../fuetures/auth/model/authSlice";
type ProtectedRouteType = {
  children : ReactNode
}
export const ProtectedRoute = ({children} : ProtectedRouteType) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  if(!isLoggedIn) {
    return <Navigate to="/login"/>
  }
  return <>{ children }</>

};
