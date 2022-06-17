import useAsync from "../useAsync";
import api, { Category } from "../../services/api";
import useAuth from "../useAuth";

export default function useCategories() {
  const { auth } = useAuth();

  const {
    act: getCategories,
    loading: categoriesLoading,
    data: categories,
  } = useAsync(() => api.getCategories(auth?.token as string), true);

  return {
    getCategories,
    categoriesLoading,
    categories: categories as unknown as Category[],
  };
}
