import { Alert as MUIAlert, Snackbar, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import useAlert from "../../hooks/useAlert";

export default function Alert() {
  const { message, handleClose } = useAlert();

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MUIAlert
        variant="filled"
        severity={message?.type || "error"}
        onClose={handleClose}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: message?.type === "success" ? "#1caf1c" : "#ca362b",
        }}
        iconMapping={{
          success: <CheckRoundedIcon />,
        }}
      >
        <Typography variant="h3" textAlign="center">
          {message?.text}
        </Typography>
      </MUIAlert>
    </Snackbar>
  );
}
