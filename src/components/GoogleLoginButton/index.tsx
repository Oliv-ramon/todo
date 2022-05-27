import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Button, SxProps, Typography } from "@mui/material";
import { CSSProperties } from "react";

export default function GoogleLoginButton() {
  return (
    <Button variant="outlined" sx={style.button} size="large">
      <GoogleIcon style={style.icon} />
      <Typography variant="h3">Entrar com conta Google</Typography>
    </Button>
  );
}

interface GoogleLoginButtonStyle {
  button: SxProps;
  icon: CSSProperties;
}

const style: GoogleLoginButtonStyle = {
  button: {
    minHeight: "44px",
    width: "100%",
    p: "7px 50px",
    mt: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },
  icon: {
    fontSize: "28px",
    position: "absolute",
    top: "auto",
    bottom: "auto",
    left: "14px",
  },
};
