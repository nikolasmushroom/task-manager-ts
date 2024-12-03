import { createContext, ReactNode, useEffect, useState } from "react";
import { Toast } from "common/components/Toast/ui/Toast";

export type SideTypes = "left-top" | "right-top" | "right-bottom" | "left-bottom"
export type ToastContainerProps = {
  children: ReactNode
}
export type ToastType = "success" | "error"

export type showMessageMethodType = (message: string,
                                     side?: SideTypes,
                                     onClose?: () => void,
                                     delay?: number
) => void

export type ToastContextType = {
  error: showMessageMethodType
  success: showMessageMethodType
}
export const ToastContext = createContext<ToastContextType>({
  error(): void {
  },
  success(): void {
  }
});

export const ToastContainer = ({ children }: ToastContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState<SideTypes>("left-bottom");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timerDelay, setTimerDelay] = useState(3000);
  const [progress, setProgress] = useState(100);
  const [toastType, setToastType] = useState<ToastType>("success");
  const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null);
  const handleClose = () => {
    setIsOpen(false);
  };
  const showMessage: showMessageMethodType = (message,
                                              side,
                                              onClose,
                                              delay = timerDelay
  ) => {
    setTimeout(() => {
      setIsOpen(true);
      setToastMessage(message);
      if (delay) {
        setTimerDelay(delay);
      }
      if (side) {
        setSide(side);
      }
      if (onClose) {
        setOnCloseCallback(onClose);
      }
    }, 0);
  };
  useEffect(() => {
    if (isOpen && toastMessage) {
      window.addEventListener("mousedown", handleClose);
      const interval = timerDelay / 100;
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 1) {
            clearInterval(timer);
            handleClose();
            return 0;
          }
          return prevProgress - 1;
        });
      }, interval);

      return () => {
        clearInterval(timer);
        window.removeEventListener("mousedown", handleClose);
      };

    }
    return () => {
      setProgress(100);
    };
  }, [isOpen, toastMessage, progress, timerDelay, onCloseCallback]);
  const error: showMessageMethodType = (message, side, onClose, delay) => {
    setToastType("error");
    showMessage(message, side, onClose, delay);
  };

  const success: showMessageMethodType = (message, side, onClose, delay) => {
    setToastType("success");
    showMessage(message, side, onClose, delay);
  };

  return <ToastContext.Provider value={{ error, success }}>
    {isOpen && toastMessage && <Toast message={toastMessage} type={toastType} side={side} progress={progress} />}
    {children}
  </ToastContext.Provider>;
};
