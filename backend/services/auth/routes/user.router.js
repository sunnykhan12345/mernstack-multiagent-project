import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
const router = express.Router();

// Auth is verified upstream by the gateway's `protect` middleware, which
// forwards the resolved user via the `x-user-id` header.
router.post("/login", login);
router.get("/logout", logout);

export default router;
