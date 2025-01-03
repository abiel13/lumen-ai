"use server";
import History from "../models/history.models";

interface HistoryPayload {
  conversationId: string;
  messages?: string[];
}

// Create a new history record
export async function createHistory({
  conversationId,
  messages = [],
}: HistoryPayload): Promise<typeof History> {
  try {
    const history = new History({ conversationId, messages });
    await history.save();
    return JSON.parse(JSON.stringify(history));
  } catch (error: any) {
    throw new Error(`Error creating history: ${error.message}`);
  }
}

// Get all history records
export async function getHistories(): Promise<(typeof History)[]> {
  try {
    const histories = await History.find()
      .sort({ createdAt: -1 })
      .populate("messages");
    return histories;
  } catch (error: any) {
    throw new Error(`Error fetching histories: ${error.message}`);
  }
}

// Get a history record by ID
export async function getHistoryById(
  historyId: string
): Promise<typeof History | null> {
  try {
    const history = await History.findById(historyId).populate("messages");
    if (!history) {
      throw new Error("History not found");
    }
    return history;
  } catch (error: any) {
    throw new Error(`Error fetching history: ${error.message}`);
  }
}

// Update a history record
export async function updateHistory(
  historyId: string,
  updateData: Partial<HistoryPayload>
): Promise<typeof History | null> {
  try {
    const history = await History.findByIdAndUpdate(historyId, updateData, {
      new: true,
    }).populate("messages");
    if (!history) {
      throw new Error("History not found");
    }
    return history;
  } catch (error: any) {
    throw new Error(`Error updating history: ${error.message}`);
  }
}

export async function addMessageToHistory(conversationId:string, messageId:string, ) {
  try {
    const history = await History.findOneAndUpdate(
      { conversationId },
      {
        $addToSet: { messages: messageId },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return JSON.parse(JSON.stringify(history));
  } catch (error) {
    console.log(error);
  }
}

// Delete a history record
export async function deleteHistory(
  historyId: string
): Promise<typeof History | null> {
  try {
    const history = await History.findByIdAndDelete(historyId);
    if (!history) {
      throw new Error("History not found");
    }
    return history;
  } catch (error: any) {
    throw new Error(`Error deleting history: ${error.message}`);
  }
}
