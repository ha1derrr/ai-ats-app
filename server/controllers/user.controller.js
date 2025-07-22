import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body;
    if ([name, email, password, username].some((field) => field?.trim() === ""))
      throw new ApiError(400, "One or more fields are missing");
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new ApiError(400, "User already exists");
    const localFilePath = req.file?.path;
    let avatar;
    if (localFilePath) {
      avatar = await uploadToCloudinary(localFilePath);
    }
    if (localFilePath && !avatar?.url) {
      console.warn("Cloudinary upload failed");
    }
    const user = await User.create({
      name,
      email,
      password,
      username,
      avatar: avatar?.url ?? "",
      // avatar: avatar.url || "",
    });
    if (!user) throw new ApiError(503, "Could not register user");
    // const registeredUser = await User.findById(user._id).select("-password");
    res.status(201).json(
      new ApiResponse(201, "User Registered Successfully", {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      })
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username && !email)
      throw new ApiError(401, "One of the field is required");
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new ApiError(401, "User Not found");
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) throw new ApiError(401, "Invalid Credentials");
    const token = await user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json(
        new ApiResponse(200, "User Logged In Successfully", {
          _id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        })
      );
  } catch (error) {
    next(error);
  }
};

const getMe = (req, res) => {
  if (req.user)
    return res
      .status(201)
      .json(new ApiResponse(201, "User Fetched Successfully", req.user));
  return null;
};

export { register, login, getMe };
