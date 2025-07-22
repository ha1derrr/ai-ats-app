import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { ROLES } from "../constants/roles.js";
import { createJob } from "../controllers/job.controller.js";
export const jobRouter = Router();

jobRouter
  .route("/create")
  .post(jwtVerify, authorizeRoles(ROLES.RECRUITER), createJob);
