import { clsx, type ClassValue } from "clsx";
import { IncomingHttpHeaders } from "http";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeHeaders(
  headers: IncomingHttpHeaders
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value)) {
      result[key] = value.join(", "); // join multiple header values into one string
    }
  }

  return result;
}
