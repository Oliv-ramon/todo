import HomeIcon from "@mui/icons-material/HomeRounded";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import CalendarIcon from "@mui/icons-material/CalendarMonthRounded";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
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
