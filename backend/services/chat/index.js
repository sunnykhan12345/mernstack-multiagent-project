import express from "express";
import dotenv from "dotenv";
import router from "./routes/chat.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
import connectDB from "../auth/config/db.js";

// Middleware

app.use(express.json());

connectDB();
app.get("/", (req, res) => {
  res.send("chat connected successfully chat!");
});
app.use("/", router);

app.listen(PORT, () => {
  console.log(`chat started at  ${PORT}`);
});
