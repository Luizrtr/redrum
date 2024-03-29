// utils/api.ts
import { api } from "./api";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (userData: UserData) => {
  try {
    const response = await api.post("api/register", userData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
