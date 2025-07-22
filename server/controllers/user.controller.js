import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

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
      throw new ApiError(400, "Email or Username is required");
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new ApiError(404, "User not found");
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
  if (!req.user) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User Fetched Successfully", req.user));
};

const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ["name", "role"];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field]) updates[field] = req.body[field];
    }
    if (updates.role && !["candidate", "recruiter"].includes(updates.role))
      throw new ApiError(401, "Invalid User Role");
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name: updates.name, role: updates?.role?.toLowerCase() },
      { new: true }
    ).select("-password");
    res
      .status(200)
      .json(new ApiResponse(200, "User Updated Successfully", user));
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new ApiError(401, "Email Required");
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User Not found");
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const message = `Reset your password using the following link: \n\n${resetURL}
    \n\nThis URL is valid for only 15 minutes`;
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });
    res.status(200).json(new ApiResponse(200, "Reset link sent to your email"));
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;
    if (!token || !newPassword)
      throw new ApiError(401, "Token or New Password is missing");
    const hashedToken = crypto.hash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) throw new ApiError(400, "Token is invalid or expired");
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    res.status(200).json(new ApiResponse(200, "Password reset successfull"));
  } catch (error) {
    next(error);
  }
};

export { register, login, getMe, updateProfile, forgotPassword, resetPassword };
