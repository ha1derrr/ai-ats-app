import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const parseResume = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, "No file uploaded");
    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file?.originalname,
      contentType: req.file?.mimetype,
    });
    const response = await axios.post(
      "https://api.affinda.com/v2/resumes",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: process.env.AFFINDA_API_KEY,
        },
      }
    );
    const resumeData = response?.data?.data;
    if (!resumeData) throw new ApiError(500, "Internal Server Error");
    res
      .status(200)
      .json(new ApiResponse(200, "Resume parsed successfully", resumeData));
  } catch (error) {
    next(error);
  }
};

export { parseResume };
