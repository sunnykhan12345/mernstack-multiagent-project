import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: new URL("./.env", import.meta.url) });

import connectDB from "../auth/config/db.js";
import router from "./router/agent.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("agent connected successfully agent!");
});

app.use("", router);

app.listen(PORT, () => {
  console.log(`agent started at ${PORT}`);
});
