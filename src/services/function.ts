// utils/api.ts
import { api } from "./api";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (userData: UserData): Promise<string> => {
  try {
    const response = await api.post("api/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
