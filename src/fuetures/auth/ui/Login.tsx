import styles from "./Login.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "common/components/Input/TextInput";
import { Button } from "common/components/Button/Button";
import Checkbox from "@mui/material/Checkbox";

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}
export const Login = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
            required: true,
            minLength: { value: 7, message: "Login should have at least 7 symbols" }
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={"Email"}
            />
          )}
        />
        {errors.email?.message && (
          <p>{errors.email?.message}</p>
        )}
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: { value: 7, message: "Password should have at least 7 symbols" }
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={"password"}
            />
          )}
        />
        {errors.password?.message && (
          <p>{errors.password?.message}</p>
        )}
        <div>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <div>
                <Checkbox {...field} />
                <span>Remember me</span>
              </div>
            )}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};