import { useContext } from "react";
import { ToastContext } from "common/components/Toast/ui/ToastContainer";

export const useToast = () => {
  const toast = useContext(ToastContext);
  return { toast }
};