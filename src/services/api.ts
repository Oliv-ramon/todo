import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:5000/",
});

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

const api = {
  signUp,
  signIn,
};

export default api;
