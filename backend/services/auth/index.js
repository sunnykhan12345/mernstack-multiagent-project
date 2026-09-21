import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
import connectDB from "../auth/config/db.js";
import router from "./routes/user.router.js";
// Middleware

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);
connectDB();
app.get("/", (req, res) => {
  res.send("API connected successfully auth!");
});

app.listen(PORT, () => {
  console.log(`auth started at  ${PORT}`);
});
