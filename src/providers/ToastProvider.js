import { createContext, useContext, useState } from "react";
import SuccessSnackBar from "../components/snackbars/SuccessSnackBar/SuccessSnackBar";

const ToastContext = createContext(null);

export let ToastProvider = ({ children }) => {
  //state
  let [openSuccessSnackBarState, setOpenSuccessSnackBarState] = useState(false);
  let [snackBarMessageState, setSnackBarMessageState] = useState(null);

  //methods
  function closeSuccessSnackBar() {
    setOpenSuccessSnackBarState(false);
  }

  function openSnackBarHandler(message) {
    setOpenSuccessSnackBarState(true);
    setSnackBarMessageState(message);
  }

  return (
    <ToastContext.Provider value={openSnackBarHandler}>
      {/* Start success snack bar */}
      <SuccessSnackBar
        isOpen={openSuccessSnackBarState}
        closeHandler={closeSuccessSnackBar}
        message={snackBarMessageState}
      />
      {/* end success snack bar */}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
