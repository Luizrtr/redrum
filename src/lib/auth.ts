import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export const createJWT = (userData: User) => {
  try {
    const token = jwt.sign(userData, "token_redrum", { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Erro ao criar o token JWT:", error);
    return null;
  }
};

export async function recoverUserInformation(token: string) {
  try {
    const decodedToken: User = await jwtDecode(token);
    console.log(decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
    return null;
  }
}