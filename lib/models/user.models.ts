"use server"
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  history: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "History",
  },
});


const User = mongoose.models.User || mongoose.model("User" , userSchema)
export default User