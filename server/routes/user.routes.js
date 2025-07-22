import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  login,
  register,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
export const router = Router();
router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/me").get(jwtVerify, getMe);
router.route("/update").patch(jwtVerify, updateProfile);
router.route("/auth/forgot-password").patch(forgotPassword);
router.route("/auth/reset-password").patch(resetPassword);
