import { Box } from "@mui/system";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography, SxProps, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";

export interface LogoStyles {
  container: SxProps;
  icon: SxProps;
}

export default function Logo() {
  const location = useLocation();
  const weAreOnLoginOrSignUp =
    location.pathname === "/" || location.pathname === "/login";
  const styles = getDinamicStyles(weAreOnLoginOrSignUp);

  return (
    <Box sx={styles.container}>
      <IconButton sx={{ p: 0 }}>
        <CheckCircleRoundedIcon color="primary" sx={styles.icon} />
      </IconButton>
      <Typography variant={weAreOnLoginOrSignUp ? "h1" : "h2"} component="h1">
        TodoIt
      </Typography>
    </Box>
  );
}

function getDinamicStyles(weAreOnLoginOrSignUp: boolean): LogoStyles {
  if (weAreOnLoginOrSignUp) {
    return {
      container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "50px",
        gap: "10px",
      },
      icon: {
        fontSize: "45px",
      },
    };
  }

  return {
    container: {
      padding: "30px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    icon: {
      fontSize: "35px",
    },
  };
}
