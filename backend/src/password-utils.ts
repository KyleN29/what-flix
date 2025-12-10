import bcrypt from 'bcrypt';

// Hash a plaintext password
export async function hashPassword(plain: string): Promise<string> {
  return await bcrypt.hash(plain, 10);
}

// Compare plaintext against a hashed password
export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}
