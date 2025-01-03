import { create } from "zustand";

interface message {
  content: string;
  path: "recieved" | "sent";
}

interface messageStoreI {
  messages: message[];
  addmessages: (message: message) => void;
  clearMsg: () => void;
  setMsg: (messages: message[]) => void;
}

export const useMsgStore = create<messageStoreI>((set) => ({
  messages: [],
  addmessages: (message: message) => {
    set((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  },
  clearMsg: () => {
    set((state) => ({
      ...state,
      messages: [],
    }));
  },
  setMsg: (messages) => {
    set((state) => ({
      ...state,
      messages: messages,
    }));
  },
}));
