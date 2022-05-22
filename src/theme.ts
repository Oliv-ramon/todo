import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#1caf1c" },
    secondary: { main: "rgba(11,70,1,1)" },
    text: { primary: "#fff" },
    action: {
      active: "#fff",
      disabled: "#ffffffb2",
      disabledBackground: "#1caf1c6c",
    },
    divider: "#333",
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "Commissioner, sans-serif",
    h1: {
      fontSize: "35px",
      fontWeight: "700",
    },
    h2: {
      fontSize: "24px",
      fontWeight: "500",
    },
    h3: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#fff",
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {},
    },
    MuiOutlinedInput: {
      defaultProps: {
        autoComplete: "off",
      },
      styleOverrides: {
        notchedOutline: {
          borderColor: "#333",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {},
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#eee",
        },
      },
    },
  },
});

export default theme;
