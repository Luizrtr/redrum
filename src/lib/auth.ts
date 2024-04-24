import { jwtDecrypt, EncryptJWT, base64url } from 'jose';

type User = {
  name: string;
  email: string;
  avatar: string;
};

const key = base64url.decode('fROKWHC2QQQAN5y8kmkUFUxuOtsIrMKHhzGCZU0TZfw');

export const createToken = async (userData: User) => {
  try {
    const token = await new EncryptJWT(userData)
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .encrypt(key);

    return token;
  } catch (error) {  
    console.error("Erro ao codificar o token JWT:", error);
    return null;
  }
};

export async function recoverUserInformation(token: string) {
  try {
    const { payload } = await jwtDecrypt(token, key);
    return payload;
  } catch (error) {
    console.error('Token inválido:', error.message);
    return null;
  }
}