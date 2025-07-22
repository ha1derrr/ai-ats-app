import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";

const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      experienceRequired,
      education,
    } = req.body;
    if (!title || !description)
      throw new ApiError(400, "Title and description required");
    const createdJob = await Job.create({
      title,
      description,
      requiredSkills,
      experienceRequired,
      education,
      createdBy: req.user._id,
    });
    res
      .status(201)
      .json(new ApiResponse(201, "Job created successfully", createdJob));
  } catch (error) {
    next(error);
  }
};

export { createJob };
