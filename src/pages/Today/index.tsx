import { Box, Typography } from "@mui/material";
import Category from "./Category";
export default function Today() {
  return (
    <Box
      component="main"
      sx={{
        height: "calc(100vh - 152px)",
        overflow: "scroll",
        "&.::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Box component="section">
        <Typography>Categorias</Typography>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </Box>
    </Box>
  );
}
