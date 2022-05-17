import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import SignUp from "./pages/SignUp";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
