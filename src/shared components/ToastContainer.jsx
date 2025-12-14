import { Bounce, toast } from "react-toastify";

export const successToast = (message) =>{
    toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
 });
}

export const defaultToast = (message) =>{
    toast.info(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
 });
}

