import { Router } from "express";
import { uploadResume } from "../middlewares/resume.multer.middleware.js";
import { parseResume } from "../controllers/resume.controller.js";

export const resumeRouter = Router();

resumeRouter.route("/upload").post(uploadResume.single("resume"), parseResume);
