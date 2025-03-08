import bcrypt from 'bcrypt';

export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error('Erro ao gerar o hash da senha:', error);
    throw error;
  }
}
