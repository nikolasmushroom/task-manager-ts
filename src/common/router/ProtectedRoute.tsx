import React from 'react'
import {Navigate} from "react-router-dom"
import { useAppSelector } from "common/hooks";
import { selectIsLoggedIn } from "../../fuetures/auth/model/authSelectors";

export const ProtectedRoute = ({children} : any) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  if(!isLoggedIn) {
    return <Navigate to="/login"/>
  }
  return children

};
