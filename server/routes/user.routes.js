import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  login,
  register,
  getMe,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
export const router = Router();
router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/me").get(jwtVerify, getMe);
