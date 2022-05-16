import { ReactComponent as GoogleIcon } from "../../assets/icons8-google.svg";
import { Button, Typography } from "@mui/material";

export default function GoogleLoginButton() {
  return (
    <Button
      variant="outlined"
      sx={{
        height: "38px",
        width: "100%",
        mt: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <GoogleIcon style={{ width: "28px" }} />
      <Typography
        sx={{
          fontSize: "14px",
          color: "white",
          fontWeight: "500",
          justifySelf: "center",
        }}
      >
        Entrar com conta Google
      </Typography>
      <GoogleIcon style={{ width: "28px", opacity: "0" }} />
    </Button>
  );
}
