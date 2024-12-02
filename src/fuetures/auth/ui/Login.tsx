import styles from "./Login.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "common/components/Input/TextInput";
import React, { useEffect } from "react";
import { Button } from "common/components/Button/Button";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  selectCaptchaUrl,
  selectIsLoggedIn,
  setIsLoggedIn
} from "../../../app/model/appSlice";
import { LoginParams, useLoginMutation } from "../api/auth-api";

import { ResultCode } from "common/enums/resultCodeEnum";


export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const captchaUrl = useAppSelector(selectCaptchaUrl);
  const [login] = useLoginMutation();
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe");
    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
      setValue("rememberMe", savedRememberMe === "true");
    }
  }, []);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<LoginParams>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
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
  const onSubmit: SubmitHandler<LoginParams> = (data) => {
    login(data).then(result => {
      if (result.data?.resultCode === ResultCode.Success) {
        localStorage.setItem("sn-token", result.data.data.token);
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        if (data.rememberMe) {
          setDataToLocalStorage(data.email, data.password, data.rememberMe);
        }
      } else {
        removeDataFromLocalStorage();
      }
      reset();
    });
  };
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.formContainer}>
      <p>
        To login get registered
        <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
          here
        </a>
      </p>
      <p>or use common test account credentials:</p>
      <p>
        <b>Email:</b> free@samuraijs.com
      </p>
      <p>
        <b>Password:</b> free
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Email must be at least 3 characters long"
            },
            minLength: { value: 7, message: "Login should have at least 7 symbols" },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Incorrect email address"
            }
          }}
          render={({ field }) => (
            <TextInput
              error={errors.email?.message}
              {...field}
              placeholder={"Email"}
            />
          )}
        />
        {errors.email?.message && <div className={styles.errorMessage}>{errors.email?.message}</div>}
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Password must be at least 3 characters long"
            },
            minLength: { value: 7, message: "Password should have at least 7 symbols" }
          }}
          render={({ field }) => (
            <TextInput
              type="password"
              error={errors.password?.message}
              {...field}
              placeholder={"password"}
            />
          )}
        />
        {errors.password?.message && <div className={styles.errorMessage}>{errors.password?.message}</div>}
        {captchaUrl ?
          <div>
            <img src={captchaUrl} alt="captcha image" />
            <Controller
              name="captcha"
              control={control}
              render={({ field }) => (
                <TextInput
                  type="text"
                  error={errors.captcha?.message}
                  {...field}
                  placeholder={"Please, enter symbols from image"}
                />
              )}
            />
          </div> :
          ""}
        <div>
          <div>
            <input type="checkbox" {...register("rememberMe")} />
            <span>Remember me</span>
          </div>
        </div>
        <Button type="submit">Login</Button>
      </form>

    </div>
  );
};