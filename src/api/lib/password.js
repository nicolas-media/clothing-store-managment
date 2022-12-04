import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async password => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (password, hashedPassword) => {
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  return passwordMatches;
};
