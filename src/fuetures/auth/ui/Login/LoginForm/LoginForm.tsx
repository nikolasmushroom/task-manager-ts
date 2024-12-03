import styles from "../Login.module.css";
import { Controller } from "react-hook-form";
import { TextInput } from "common/components/Input/TextInput";
import { Button } from "common/components/Button/Button";
import { useLogin } from "../../../lib/hooks/useLogin";

export const LoginForm = () => {
  const {handleSubmit, onSubmit, control, errors, captchaUrl, register} = useLogin()

  return <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
              placeholder={"Please, enter symbols"}
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
}