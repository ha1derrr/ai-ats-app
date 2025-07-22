import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath) => {
  try {
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    if (res) console.log(`File uploaded on Cloudinary with url ${res.url}`);
    return res;
  } catch (error) {
    console.error(`Failed to upload on Cloudinary`);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
