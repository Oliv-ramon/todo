import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MainApp from "./components/MainApp";
import AddTask from "./pages/Add";
import theme from "./theme";
import Today from "./pages/Today";
import Calendar from "./pages/Calendar";

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
                <Route path="/app/today" element={<Today />} />
                <Route path="/app/add" element={<AddTask />} />
                <Route path="/app/calendar" element={<Calendar />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
