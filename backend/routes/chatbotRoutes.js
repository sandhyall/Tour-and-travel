import express from "express";
import {
  sendMessage,
  getChatHistory,
} from "../controllers/chatbotController.js";

const router = express.Router();

// 👇 PUBLIC CHATBOT (NO LOGIN REQUIRED)
router.post("/send", sendMessage);
router.get("/history", getChatHistory);

export default router;