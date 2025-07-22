import { ApiError } from "../utils/ApiError.utils.js";
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role))
      throw new ApiError(403, "Unauthorized Request");
    next();
  };
};
