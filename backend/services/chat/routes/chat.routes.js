import express from "express";
import {
  createConversation,
  getConversations,
  saveMessage,
  getMessages,
  updateConversation,
} from "../controller/chat.controllers.js";
const router = express.Router();

router.get("/create-conversation", createConversation);
router.get("/get-conversation", getConversations);
router.post("/update-conversations", updateConversation);
router.post("/save-message", saveMessage);
router.get("/get-messages/:conversationId", getMessages);

export default router;
