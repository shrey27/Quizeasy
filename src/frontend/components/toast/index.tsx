import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessage = (msg: String, type: any) =>
  toast(msg, {
    position: 'bottom-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    type,
    transition: Slide,
    theme: 'dark'
  });
