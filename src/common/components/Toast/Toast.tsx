import styles from "common/components/Toast/ToastNew.module.css";
import { SideTypes, ToastType } from "common/components/Toast/ToastContainer";

export type ToastProps = {
  message: string
  progress: number
  side?: SideTypes
  type: ToastType
}
export const Toast = ({ message, side = "left-bottom", progress, type }: ToastProps) => {

  return <div className={`${styles.toast} ${styles[side]}`}>
    {message}
    <div className={`${styles.progressLine} ${styles[type]}`} style={{ width: `${progress}%` }}></div>
  </div>;
};