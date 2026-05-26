// // controllers/chatController.js
// import Chat from "../models/chatBot.js";

// export const chatBot = async (req, res) => {
//   const { message } = req.body;

//   let reply = "Sorry, I didn't understand.";

//   const msg = message?.toLowerCase() || "";

//   if (msg.includes("price")) {
//     reply = "Prices depend on the trip. Please check trip details.";
//   }
//   else if (msg.includes("booking")) {
//     reply = "You can book by selecting a date and proceeding to payment.";
//   }
//   else if (msg.includes("contact")) {
//     reply = "You can contact us via email or phone.";
//   }
//   else if (msg.includes("hello")) {
//     reply = "Hello! How can I help you?";
//   }

//   const chat = await Chat.create({
//     userMessage: message,
//     botReply: reply
//   });

//   res.json(chat);
// };

// controllers/chatbotController.js
import ChatMessage from "../models/chatBot.js";
import { generateTravelReply } from "../services/openaiService.js";

// POST /chatbot/send
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    // 👇 NO user required (guest support)
    const userId = req.user?._id || null;

    await ChatMessage.create({
      userId,
      role: "user",
      content: message,
    });

    const aiReply = await generateTravelReply(message);

    await ChatMessage.create({
      userId,
      role: "assistant",
      content: aiReply,
    });

    return res.json({
      reply: aiReply,
    });

  } catch (err) {
    console.error("CHAT ERROR:", err);

    return res.status(500).json({
      reply: "AI assistant is temporarily unavailable.",
    });
  }
};

// GET /chatbot/history
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user?._id || null;

    const filter = userId ? { userId } : {}; // guest sees global or empty chat

    const messages = await ChatMessage.find(filter)
      .sort({ createdAt: 1 })
      .limit(30);

    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "History failed" });
  }
};