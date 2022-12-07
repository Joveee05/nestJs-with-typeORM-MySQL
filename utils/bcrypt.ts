import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  const SALT = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, SALT);
}
