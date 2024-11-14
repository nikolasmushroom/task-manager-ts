import React, { useEffect } from "react";
import { Alert } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { setAppErrorAC } from "../../app/app-reducer";

type CustomSnackbarPropsType = {
  open: boolean
  autoHideDuration: number
  callBack: (open: boolean) => void
  error: string | null
}
export const CustomSnackbar = ({ open, autoHideDuration, error }: CustomSnackbarPropsType) => {
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(setAppErrorAC(null))
  };
  const keyDownClose = (e : KeyboardEvent) => {
    if(e.key === 'Escape'){
      handleClose()
    }
  }
  useEffect(() => {

    const timer = setTimeout(() => {
      dispatch(setAppErrorAC(null))
    }, autoHideDuration)

    return () => clearTimeout(timer)
  }, [open, autoHideDuration]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownClose);

    return () => {
      window.removeEventListener("keydown", keyDownClose);
    };
  }, []);
  return (
    <div>
      {open && <Alert severity={'error'} onClick={handleClose}>{error}</Alert>}
    </div>
  );
};
