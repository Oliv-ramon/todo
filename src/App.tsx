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
      h2: {
        fontSize: "48px",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#333",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
