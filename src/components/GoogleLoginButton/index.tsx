import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Button, SxProps, Typography } from "@mui/material";

export default function GoogleLoginButton() {
  return (
    <Button variant="outlined" sx={style.button}>
      <GoogleIcon style={{ fontSize: "28px" }} />
      <Typography variant="h3">Entrar com conta Google</Typography>
      <GoogleIcon style={{ fontSize: "28px", opacity: "0" }} />
    </Button>
  );
}

interface GoogleLoginButtonStyle {
  button: SxProps;
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
};
