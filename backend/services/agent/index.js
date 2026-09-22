import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
import connectDB from "../auth/config/db.js";

// Middleware

app.use(express.json());

connectDB();
app.get("/", (req, res) => {
  res.send("agent connected successfully agent!");
});

app.listen(PORT, () => {
  console.log(`agent started at  ${PORT}`);
});
