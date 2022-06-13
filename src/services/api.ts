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

export interface WeekDay {
  id: number;
  name: string;
}

async function getWeekDays() {
  return baseApi.get<WeekDay[]>("/days");
}

type CategoryData = Omit<Category, "id" | "selected">;

async function getCategories(token: string) {
  const config = getConfig(token);
  return baseApi.get<Category[] | null>("/categories", config);
}

async function createCategory(categoryData: CategoryData, token: string) {
  console.log("aqui");
  const config = getConfig(token);
  return baseApi.post("/categories", categoryData, config);
}

export interface CreateTaskData {
  name: string;
  weekdays: WeekDay[];
  categoryId: number;
}

async function createTask(taskData: CreateTaskData, token: string) {
  const config = getConfig(token);
  return baseApi.post("/tasks", taskData, config);
}

export interface Category {
  id: number;
  name: string;
  color: string;
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
};

export default api;
