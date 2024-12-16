"use server"
import mongoose from "mongoose";

const historyschema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    messages: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Messages",
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.models.History || mongoose.model("History", historyschema)
export default History