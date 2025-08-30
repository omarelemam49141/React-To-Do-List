import "./App.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, green, red } from "@mui/material/colors";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {
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
        <Container className="container" maxWidth="md">
          <ToDoList />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
