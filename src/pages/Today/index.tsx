import { Box, Typography } from "@mui/material";
import Category from "../../components/pages/Today/Category";
import useCategories from "../../hooks/api/useCategories";

export default function Today() {
  const { categories } = useCategories();
  console.log(categories);
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
        {categories &&
          categories.map((category) => (
            <Category key={category.id} {...category} />
          ))}
      </Box>
    </Box>
  );
}
