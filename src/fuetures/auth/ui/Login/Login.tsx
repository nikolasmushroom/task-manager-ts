import styles from "./Login.module.css";


import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../../lib/hooks/useLogin";
import { LoginForm } from "./LoginForm/LoginForm";
import { LoginLabelForm } from "./LoginLabelForm/LoginLabelForm";


export const Login = () => {
  const {isLoggedIn} = useLogin();
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.formContainer}>
      <LoginLabelForm />
      <LoginForm />
    </div>
  );
};