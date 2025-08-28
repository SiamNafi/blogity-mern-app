import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(401)
      .json({ reason: "NO_TOKEN", message: "Unauthorized" });
  }
  try {
    const decoded = await verifyToken(token);
    const user = await findUserById(decoded);
    if (!user) {
      return res
        .status(401)
        .json({ reason: "USER_NOT_FOUND", message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ reson: "TOKEN_INVALID", message: "Unauthorized" });
  }
};
