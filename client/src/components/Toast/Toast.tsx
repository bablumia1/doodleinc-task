import { Flip, ToastContainer } from "react-toastify";
const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={900}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="dark"
      transition={Flip}
    />
  );
};

export default Toast;
