import { hash } from "bcrypt";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 10);

  return hashedPassword;
}

export { hashPassword };
