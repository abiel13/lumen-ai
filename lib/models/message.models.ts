"use server"
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "video"],
      default: "text",
    },
    content: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      enum: ["sent", "recieved"],
      default: "sent",
    },
  },
  {
    timestamps: true,
  }
);


const Messages = mongoose.models.Messages || mongoose.model("Messages" , messageSchema)

export default Messages