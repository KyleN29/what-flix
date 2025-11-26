import bcrypt from 'bcrypt';

export async function hashPassword(plain: string): Promise<string> {
  return await bcrypt.hash(plain, 10);
}

export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}
