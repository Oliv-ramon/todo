import { Box } from "@mui/system";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography } from "@mui/material";
import { LogoStyles } from "../../pages/SignUp/style";

interface LogoProps {
  sx: LogoStyles;
}

export default function Logo({ sx: style }: LogoProps) {
  return (
    <Box sx={style.container}>
      <CheckCircleRoundedIcon color="primary" sx={style.icon} />
      <Typography component="h1" sx={style.h1}>
        TodoIt
      </Typography>
    </Box>
  );
}
