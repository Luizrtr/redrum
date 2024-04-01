import { jwtDecode } from "jwt-decode";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export async function recoverUserInformation(token: string) {
  try {
    const decodedToken: User = await jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
    return null;
  }
}
