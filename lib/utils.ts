import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genuid() {
  return uuidv4();
}


export const formatTextRes = (text:string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong className='my-8'>$1</strong>") // Bold (**text**)
    .replace(/\*(.*?)\*/g, "<em className='my-8'>$1</em>") // Italics (*text*)
    .replace(/\n\n/g, "</p><p>") // New paragraph for double newlines
    .replace(/\n/g, "<br>"); // Line break for single newlines
};