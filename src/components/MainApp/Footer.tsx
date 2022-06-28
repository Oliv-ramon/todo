import HomeIcon from "@mui/icons-material/HomeRounded";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import CalendarIcon from "@mui/icons-material/CalendarMonthRounded";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const { pathname } = useLocation();
  const actualRoute = pathname.split("/")[2];
  const [value, setValue] = useState(actualRoute);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
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
          label="Add"
          icon={<AddIcon />}
        />
        <BottomNavigationAction
          value="calendar"
          label="Calendar"
          icon={<CalendarIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
