import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely.
 * Later classes win when they conflict (e.g., `px-4 px-6` → `px-6`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
