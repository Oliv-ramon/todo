import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo";
import Footer from "./Footer";
import { Navigate, Outlet } from "react-router-dom";

export default function MainApp() {
  const { auth, logout } = useAuth();

  if (auth === null) return <Navigate to="/login" />;
  return (
    <Box sx={{ padding: "0 20px" }}>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <IconButton>
          <LogoutIcon sx={{ fontSize: "32px" }} onClick={() => logout()} />
        </IconButton>
      </Box>
      <Outlet />
      <Footer />
    </Box>
  );
}
