// controllers/chatController.js
import Chat from "../models/chatBot.js";

export const chatBot = async (req, res) => {
  const { message } = req.body;

  let reply = "Sorry, I didn't understand.";

  const msg = message?.toLowerCase() || "";

  if (msg.includes("price")) {
    reply = "Prices depend on the trip. Please check trip details.";
  }
  else if (msg.includes("booking")) {
    reply = "You can book by selecting a date and proceeding to payment.";
  }
  else if (msg.includes("contact")) {
    reply = "You can contact us via email or phone.";
  }
  else if (msg.includes("hello")) {
    reply = "Hello! How can I help you?";
  }

  const chat = await Chat.create({
    userMessage: message,
    botReply: reply
  });

  res.json(chat);
};