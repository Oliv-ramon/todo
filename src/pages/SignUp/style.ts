import { SxProps } from "@mui/material";

interface SignUpStyles {
  container: SxProps;
  form: SxProps;
  input: SxProps;
  button: SxProps;
} 

const styles: SignUpStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center"
  },
  form: {
    width: "100%",
    px: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",
    gap: "10px"
  },
  input: {
    width: "100%"
  },
  button: {
    width: "100%"
  }
}

export default styles;