import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MainApp from "./components/MainApp";
import Today from "./pages/Today";
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
              <Route path="/app" element={<MainApp />}>
                <Route path="/app/today" element={<h1>today</h1>} />
                <Route path="/app/add" element={<h1>add</h1>} />
                <Route path="/app/callendar" element={<h1>callendar</h1>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
