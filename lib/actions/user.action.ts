"use server";

import User from "../models/user.models";


// Create a new user
export async function createUser(clerkId:string) {
  try {
    const user = new User({ clerkId });
    await user.save();
    return user;
  } catch (error:any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

// Get a user by their Clerk ID
export async function getUserByClerkId(clerkId:string) {
  try {
    const user = await User.findOne({ clerkId }).populate("history");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error:any) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

// Add a history record to a user
export async function addHistoryToUser(clerkId:string, historyId:string) {
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    user.history.push(historyId);
    await user.save();
    return user;
  } catch (error:any) {
    throw new Error(`Error adding history: ${error.message}`);
  }
}

// Update user details
export async function updateUser(clerkId:string, updateData:any) {
  try {
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error:any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

// Delete a user
export async function deleteUser(clerkId:string) {
  try {
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error:any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}
