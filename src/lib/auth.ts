import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export async function recoverUserInformation() {
  const { ["token_redrum"]: token } = parseCookies();

  if (!token) {
    return null;
  }

  try {
    const decodedToken: User = await jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
    return null;
  }
}
