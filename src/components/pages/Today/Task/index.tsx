import CheckedIcon from "@mui/icons-material/CheckCircleRounded";
import UncheckedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Box, Checkbox, Typography } from "@mui/material";

interface Props {
  name: string;
  categoryColor: string;
}

export default function Task({ name, categoryColor }: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        sx={{
          p: "16px",
          color: categoryColor,
          "&.Mui-checked": { color: categoryColor },
        }}
        icon={<UncheckedIcon sx={{ color: categoryColor, fontSize: "26px" }} />}
        checkedIcon={
          <CheckedIcon sx={{ color: categoryColor, fontSize: "26px" }} />
        }
      />
      <Typography>{name}</Typography>
    </Box>
  );
}
