import { Slide, Theme, toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastMessage = (msg: String, type: TypeOptions, theme: Theme) =>
  toast(msg, {
    position: "bottom-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    type: type,
    transition: Slide,
    theme,
  });
