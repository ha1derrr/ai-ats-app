import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allows cookies
  })
);
app.use(express.json());
app.use(express.urlencoded());

// Registering Routes
import { userRouter } from "./routes/index.js";
app.use("/user", userRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  });
});
