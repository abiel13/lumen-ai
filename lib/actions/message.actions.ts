'use server'
import Messages from "../models/message.models";


interface MessagePayload {
  type?: "text" | "image" | "video";
  content: string;
  path?: "sent" | "recieved";
}

// Create a new message
export async function createMessage({ type, content, path }: MessagePayload): Promise<typeof Messages> {
  try {
    const message = new Messages({ type, content, path });
    await message.save();
    return JSON.parse(JSON.stringify(message));
  } catch (error: any) {
    throw new Error(`Error creating message: ${error.message}`);
  }
}

// Get all messages
export async function getMessages(): Promise<typeof Messages[]> {
  try {
    const messages = await Messages.find().sort({ createdAt: -1 });
    return messages;
  } catch (error: any) {
    throw new Error(`Error fetching messages: ${error.message}`);
  }
}

// Get a message by ID
export async function getMessageById(messageId: string): Promise<typeof Messages | null> {
  try {
    const message = await Messages.findById(messageId);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  } catch (error: any) {
    throw new Error(`Error fetching message: ${error.message}`);
  }
}

// Update a message
export async function updateMessage(messageId: string, updateData: Partial<MessagePayload>): Promise<typeof Messages | null> {
  try {
    const message = await Messages.findByIdAndUpdate(messageId, updateData, {
      new: true,
    });
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  } catch (error: any) {
    throw new Error(`Error updating message: ${error.message}`);
  }
}

// Delete a message
export async function deleteMessage(messageId: string): Promise<typeof Messages | null> {
  try {
    const message = await Messages.findByIdAndDelete(messageId);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  } catch (error: any) {
    throw new Error(`Error deleting message: ${error.message}`);
  }
}
