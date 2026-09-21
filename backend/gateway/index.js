import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "../gateway/middleware/auth.middleware.js";
import { getCurrentUser } from "./controller/user.controller.js";
import proxyWithHeader from "./utils/proxyWithHeader.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.use("/api/chat", protect, proxyWithHeader(process.env.Chat_SERVICE_URL));
app.use("/api/me", protect, getCurrentUser);

app.get("/", (req, res) => {
  res.json({ message: "Hello from gateway" });
});

app.listen(PORT, () => {
  console.log(`gateway is running on port ${PORT}`);
});
