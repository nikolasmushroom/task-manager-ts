import styles from "./ToastNew.module.css";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const ToastContext = createContext({
  error(message: string, onClose?: () => void) {
  }
});

export type ToastProps = {
  message: string
  side: "left-top" | "right-top" | "left-bottom" | "right-bottom" | "top" | "bottom"
}


type ToastContainerProps = {
  children: ReactNode
}


export const ToastContainer = ({ children }: ToastContainerProps) => {

 const useToast = useContext(ToastContext);


  const [message, setMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  return <ToastContext.Provider value={{
    error(message: string, onClose?: () => void) {
        setMessage(message);
        const timeout = setTimeout(() => {
          setMessage(null);
        }, 4000);
        return () => clearTimeout(timeout);
    }
  }}>
    {message && <Toast message={message} side={"left-top"} />}
    {}
    {children}
  </ToastContext.Provider>;

};
export const Toast = ({ message, side }: ToastProps) => {
  return <div className={`${styles.toast} ${styles[side]}`}>
    {message}
  </div>;
};