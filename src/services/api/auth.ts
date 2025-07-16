import apiClient from "./config";

const login = async (username: string) => {
  const response = await apiClient.post("/login", { username });
  return response.data;
};

const register = async (username: string) => {
  const response = await apiClient.post("/register", { username });
  return response.data;
};

export { login, register };
