import { create } from "zustand";

interface message {
  text: string;
  type: "recieved" | "sent";
}

interface messageStoreI {
  messages: message[];
  addmessages: (message: message) => void;
}

export const useMsgStore = create<messageStoreI>((set) => ({
  messages: [],
  addmessages: (message: message) => {
    set((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  },
}));
