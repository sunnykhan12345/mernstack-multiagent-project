import express from "express";
import dotenv from "dotenv";
import router from "./routes/chat.routes.js";
dotenv.config({ path: new URL("./.env", import.meta.url) });

const app = express();
const PORT = process.env.PORT || 8000;
import connectDB from "./config/db.js";

// Middleware

app.use(express.json());

await connectDB();
app.get("/", (req, res) => {
  res.send("chat connected successfully chat!");
});
app.use("/", router);

app.listen(PORT, () => {
  console.log(`chat started at  ${PORT}`);
});
