import { hash, compare } from "bcrypt";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 10);

  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  try {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.log(error);
  }
}

export { hashPassword, verifyPassword };
