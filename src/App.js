import "./App.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, green, red } from "@mui/material/colors";
import ToDoList from "./components/ToDoList/ToDoList";
import { useState } from "react";
import SuccessSnackBar from "./components/snackbars/SuccessSnackBar/SuccessSnackBar";
import { SnackBarDisplayHandlerContext } from "./contexts/ToDoListContext";

function App() {
  //states
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

  //properties
  const theme = createTheme({
    cssVariables: true,
    palette: {
      primary: {
        main: green[700],
      },
      secondary: {
        main: blue[400],
      },
      danger: {
        main: red[400],
      },
    },
    typography: {
      fontFamily: ["Alex"],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SnackBarDisplayHandlerContext.Provider value={openSnackBarHandler}>
          <Container className="container" maxWidth="md">
            <ToDoList />
          </Container>
        </SnackBarDisplayHandlerContext.Provider>
      </div>
      {/* Start success snack bar */}
      <SuccessSnackBar
        isOpen={openSuccessSnackBarState}
        closeHandler={closeSuccessSnackBar}
        message={snackBarMessageState}
      />
      {/* end success snack bar */}
    </ThemeProvider>
  );
}

export default App;
