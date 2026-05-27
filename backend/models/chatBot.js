import mongoose from "mongoose";

const chatMessageSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      role: {
        type: String,
        enum: ["user", "assistant"],
      },

      content: String,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "ChatMessage",
  chatMessageSchema
);