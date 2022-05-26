import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import CalendarIcon from "@mui/icons-material/CalendarMonthRounded";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Logo from "./Logo";

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
        <Logo
          sx={{
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
          }}
          typographyVariant="h2"
        />
        <IconButton>
          <LogoutIcon sx={{ fontSize: "32px" }} onClick={() => logout()} />
        </IconButton>
      </Box>
      <Outlet />
      <Footer />
    </Box>
  );
}

function Footer() {
  const [value, setValue] = useState("today");
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "none",
      }}
      elevation={3}
      component="footer"
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          navigate(`/app/${newValue}`);
          setValue(newValue);
        }}
        sx={{ background: "none" }}
      >
        <BottomNavigationAction
          value="today"
          label="Today"
          icon={<HomeIcon />}
          sx={{ fontColor: "white" }}
        />
        <BottomNavigationAction
          LinkComponent={Link}
          value="add"
          label="Adicionar"
          icon={<AddIcon />}
        />
        <BottomNavigationAction
          value="callendar"
          label="Calendário"
          icon={<CalendarIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
