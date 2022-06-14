import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:5000/",
});

function getConfig(token: string) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}

interface UserData {
  name?: string;
  email: string;
  password: string;
}

async function signUp(userData: UserData) {
  return baseApi.post("/users", userData);
}

async function signIn(userData: UserData) {
  return baseApi.post("/users/login", userData);
}
type CategoryData = Omit<Category, "id" | "selected">;

async function getCategories(token: string) {
  const config = getConfig(token);
  return baseApi.get<Category[] | null>("/categories", config);
}

async function createCategory(categoryData: CategoryData, token: string) {
  const config = getConfig(token);
  return baseApi.post("/categories", categoryData, config);
}

export interface Category {
  id: number;
  name: string;
  color: string;
  selected: boolean;
}

const api = {
  signUp,
  signIn,
  getCategories,
  createCategory,
};

export default api;
