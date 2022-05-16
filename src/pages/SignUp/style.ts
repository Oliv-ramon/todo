import { SxProps } from "@mui/material";

export interface LogoStyles {
  container: SxProps;
  icon: SxProps;
}

interface SignUpStyles {
  container: SxProps;
  logo: LogoStyles;
  form: SxProps;
  input: SxProps;
  button: SxProps;
}

const styles: SignUpStyles = {
  container: {
    minHeight: "100vh",
    padding: "80px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background:
      "linear-gradient(rgba(11,70,1,1) 0%, rgba(9,45,1,1) 12%, rgba(6,28,1,1) 25%, rgba(1,8,1,1) 60%, rgba(0,5,0,1) 100%);",
  },
  logo: {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "60px",
      gap: "10px",
    },
    icon: {
      fontSize: "50px",
    },
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "Commissioner",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    my: "20px",
    fontSize: "16px",
    color: "#fff",
  },
};

export default styles;
