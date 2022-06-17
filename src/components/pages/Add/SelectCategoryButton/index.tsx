import { Box } from "@mui/material";
import { Category } from "../../../../services/api";

interface Props {
  category: Category;
  selected: boolean;
  onClick: (category: Category) => void;
}

export default function SelectCategoryButton({
  selected,
  category,
  onClick: handleCategoryClick,
}: Props) {
  return (
    <Box
      key={category.id}
      sx={{
        p: "5px 10px",
        borderRadius: "10px",
        backgroundColor: selected ? category.color : "",
        color: selected ? "" : category.color,
        fontSize: "14px",
      }}
      onClick={() => handleCategoryClick(category)}
    >
      {category.name.toUpperCase()}
    </Box>
  );
}
