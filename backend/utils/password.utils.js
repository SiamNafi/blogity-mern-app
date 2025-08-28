import bcrypt from "bcrypt";
// hash user password
const hashPassowrd = async (password) => {
  return await bcrypt.hash(password, 10);
};

// compare user password
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { hashPassowrd, comparePassword };
