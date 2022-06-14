import { createContext, useState } from "react";
import api, { Category } from "../services/api";

interface ICategoriesContext {
  categories: Category[] | null;
  getCategories: (token: string) => void;
}

export const CategoriesContext = createContext<ICategoriesContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export function CategoriesProvider({ children }: Props) {
  const [categories, setCategories] = useState<Category[] | null>(null);

  async function getCategories(token: string) {
    const { data } = await api.getCategories(token);
    setCategories(data);
  }

  return (
    <CategoriesContext.Provider value={{ categories, getCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
