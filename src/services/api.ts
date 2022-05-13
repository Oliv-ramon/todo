import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:5000/",
});

interface UserData {
  name?: string;
  email: string;
  password: string;
}

async function signUp(userData: UserData) {
  await baseApi.post("/users", userData);
}

const api = {
  signUp,
};

export default api;
