import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.utils.js";
import { User } from "../models/user.model.js";
export const jwtVerify = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized: Token missing");
    const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedInfo?._id) throw new ApiError(401, "Invalid token payload");
    const user = await User.findById(decodedInfo._id).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
