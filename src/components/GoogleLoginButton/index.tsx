import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Button, SxProps, Typography } from "@mui/material";

export default function GoogleLoginButton() {
  return (
    <Button variant="outlined" sx={style.button}>
      <GoogleIcon style={{ fontSize: "28px" }} />
      <Typography sx={style.span}>Entrar com conta Google</Typography>
      <GoogleIcon style={{ fontSize: "28px", opacity: "0" }} />
    </Button>
  );
}

interface GoogleLoginButtonStyle {
  button: SxProps;
  span: SxProps;
}

const style: GoogleLoginButtonStyle = {
  button: {
    height: "38px",
    width: "100%",
    mt: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  span: {
    fontSize: "14px",
    color: "white",
    fontWeight: "500",
  },
};
