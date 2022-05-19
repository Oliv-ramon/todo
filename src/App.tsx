import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import theme from "./theme";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
