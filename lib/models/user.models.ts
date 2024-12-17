"use server"
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique:true,
  },
  history: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "History",
    default:[]
  },
});


const User = mongoose.models.User || mongoose.model("User" , userSchema)
export default User