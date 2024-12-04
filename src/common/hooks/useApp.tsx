import { useAppSelector } from "common/hooks/useAppSelector";
import { selectAppError, selectAppStatus, setAppError, setIsLoggedIn } from "../../app/model/appSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useToast } from "common/hooks/UseToast";
import { useMeQuery } from "../../fuetures/auth/api/auth-api";
import { ResultCode } from "common/enums/resultCodeEnum";

export const useInitializeApp = () => {
  const status = useAppSelector(selectAppStatus);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const appError = useAppSelector(selectAppError);

  const { toast } = useToast();
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
  return {isInitialized, appError};
}