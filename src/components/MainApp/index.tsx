import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo";
import Footer from "./Footer";
import { Navigate, Outlet } from "react-router-dom";
import styled from "@emotion/styled";

export default function MainApp() {
  const { auth, logout } = useAuth();

  if (auth === null) return <Navigate to="/login" />;
  return (
    <Box
      sx={{
        height: "100vh",
        padding: "75px 20px 50px 20px",
      }}
    >
      <Box
        component="header"
        sx={{
          width: "100%",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundAttachment: "fixed",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Logo />
        <IconButton>
          <LogoutIcon sx={{ fontSize: "32px" }} onClick={() => logout()} />
        </IconButton>
      </Box>
      <Container component="main">
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

const Container = styled(Box)`
  height: calc(100vh - 131px);
  overflow: scroll;
`;
