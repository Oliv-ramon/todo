import axios, { AxiosRequestConfig } from "axios";

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:5000/",
});

interface ConfigParams {
  categoryId?: number;
}

function getConfig(token: string, params?: ConfigParams): AxiosRequestConfig {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
    params,
  };
}

interface UserData {
  name?: string;
  email: string;
  password: string;
}

export interface WeekDay {
  id: number;
  name: string;
}

export interface CreateTaskData {
  name: string;
  weekdays: WeekDay[];
  categoryId: number;
}

type CreateCategoryData = Omit<Category, "id" | "userId">;

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
  userId: number;
}

async function signUp(userData: UserData) {
  return baseApi.post("/users", userData);
}

async function signIn(userData: UserData) {
  return baseApi.post("/users/login", userData);
}

async function getWeekDays() {
  return baseApi.get<WeekDay[]>("/days");
}

async function getCategories(token: string, scope?: "today") {
  const config = getConfig(token);
  const lastRoute = scope !== undefined ? `/${scope}` : "";
  return baseApi.get<Category[] | null>(`/categories${lastRoute}`, config);
}

async function createCategory(categoryData: CreateCategoryData, token: string) {
  console.log("aqui");
  const config = getConfig(token);
  return baseApi.post("/categories", categoryData, config);
}

async function createTask(taskData: CreateTaskData, token: string) {
  const config = getConfig(token);
  return baseApi.post("/tasks", taskData, config);
}

async function getTodayTasksByCategoryId(categoryId: number, token: string) {
  const config = getConfig(token, { categoryId });
  return baseApi.get<Task[] | null>("/tasks/today", config);
}

export interface Task {
  id: number;
  name: string;
  weekdays: WeekDay[];
}

const api = {
  signUp,
  signIn,
  getWeekDays,
  getCategories,
  createCategory,
  createTask,
  getTodayTasksByCategoryId,
};

export default api;
