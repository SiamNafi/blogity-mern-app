import jwt from "jsonwebtoken";

const singToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const verifyToken = async (payload) => {
  const decoded = jwt.verify(payload, process.env.JWT_SECRET);
  return decoded.id;
};

export { singToken, verifyToken };
