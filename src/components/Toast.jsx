import { Toaster } from "react-hot-toast";

function Toast({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export default Toast;
