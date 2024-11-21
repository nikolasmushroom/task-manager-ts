import { toast, ToastContainer } from "react-toastify";
import { errorType, setAppErrorAC } from "../../app/model/app-reducer";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";

type ErrorToastPropsType = {
  dispatch: AppDispatch,
  error: errorType
}

export const ErrorToast = ({ dispatch, error }: ErrorToastPropsType) => {
  useEffect(() => {
    const notify = (error: string) =>
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
        onClose: () => {
          dispatch(setAppErrorAC(null));
        }
      });
    if (error) {
      notify(error);
    }
  }, [error]);

  return <ToastContainer
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />;
};