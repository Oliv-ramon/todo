import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MainApp from "./components/MainApp";
import AddTask from "./pages/Add";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <CategoriesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/app" element={<MainApp />}>
                  <Route path="/app/today" element={<h1>today</h1>} />
                  <Route path="/app/add" element={<AddTask />} />
                  <Route path="/app/callendar" element={<h1>callendar</h1>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CategoriesProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
