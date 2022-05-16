import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#1caf1c" },
      secondary: { main: "#292E3C" },
      text: { primary: "#fff" },
      action: { active: "#fff" },
      divider: "#333",
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: "Commissioner, sans-serif",
      h1: {
        fontSize: "40px",
        fontWeight: "700",
      },
      h2: {
        fontSize: "28px",
        fontWeight: "500",
      },
      h3: {
        fontSize: "15px",
        fontWeight: "500",
        color: "#fff",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%",
          },
          notchedOutline: {
            borderColor: "#333",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
