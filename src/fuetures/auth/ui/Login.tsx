import styles from "./Login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "common/components/Input/TextInput";
import { Button } from "common/components/Button/Button";

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}
export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
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
        <TextInput placeholder={'Email'} {...register('email')}/>
        <TextInput placeholder={'password'} {...register('password')}/>
        <div>
          <input type='checkbox' {...register('rememberMe')}/><span>remember me</span>
        </div>
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
};