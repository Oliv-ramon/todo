import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export default function useCategories() {
  const categoriesContext = useContext(CategoriesContext);
  if (!categoriesContext) {
    throw new Error(
      "useCategories must be used inside a CategoriesContext Provider"
    );
  }

  return categoriesContext;
}
