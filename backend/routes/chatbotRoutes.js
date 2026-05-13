// routes/chatRoutes.js
import express from "express";
import { chatBot } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/", chatBot);

export default router;