import { Box } from "@mui/system";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography, SxProps, IconButton } from "@mui/material";

export interface LogoStyles {
  container: SxProps;
  icon: SxProps;
}

interface LogoProps {
  sx: LogoStyles;
  typographyVariant: "h1" | "h2";
}

export default function Logo({ sx: style, typographyVariant }: LogoProps) {
  return (
    <Box sx={style.container}>
      <IconButton sx={{ p: 0 }}>
        <CheckCircleRoundedIcon color="primary" sx={style.icon} />
      </IconButton>
      <Typography variant={typographyVariant} component="h1">
        TodoIt
      </Typography>
    </Box>
  );
}
