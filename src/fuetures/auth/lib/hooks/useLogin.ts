import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  selectCaptchaStatus,
  selectCaptchaUrl,
  selectIsLoggedIn, setCaptchaStatus,
  setCaptchaUrl,
  setIsLoggedIn
} from "../../../../app/model/appSlice";
import { LoginParams, useGetCaptchaMutation, useLoginMutation } from "../../api/auth-api";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResultCode } from "common/enums/resultCodeEnum";
import { useEffect } from "react";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const captchaUrl = useAppSelector(selectCaptchaUrl);
  const captchaStatus = useAppSelector(selectCaptchaStatus);
  const [getCaptchaUrl] = useGetCaptchaMutation()
  const [login] = useLoginMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginParams>({
    defaultValues: {
      email: localStorage.getItem("email") || '',
      password: localStorage.getItem("password") || '',
      rememberMe: localStorage.getItem("rememberMe") === 'true',
      captcha: ""
    },
    mode: "onSubmit"
  });

  const setDataToLocalStorage = (email: string, password: string, rememberMe: boolean) => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
  };
  const removeDataFromLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("rememberMe");
  };
  useEffect(() => {
    if (captchaStatus === true) {
      getCaptchaUrl().then((response ) => {
        if(response.data){
          dispatch(setCaptchaUrl({ captchaUrl : response.data.url }));
          dispatch(setCaptchaStatus({ status : false }));
        }
      })
    }
  }, [captchaStatus])

  const onSubmit: SubmitHandler<LoginParams> = (data) => {
    login(data)
      .then(result => {
        if (result.data?.resultCode === ResultCode.Success) {
          localStorage.setItem("sn-token", result.data.data.token);
          dispatch(setIsLoggedIn({ isLoggedIn: true }));
          if (data.rememberMe) {
            setDataToLocalStorage(data.email, data.password, data.rememberMe);
          }
        } else {
          removeDataFromLocalStorage();
        }
      })
      .finally(() => {
        reset();
      })
    ;
  };
  return { isLoggedIn, handleSubmit, onSubmit, control, errors, register, captchaUrl };
};