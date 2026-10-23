import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Host part of a url, used wherever a long deployment address has to read as a
 * short label. Falls back to the raw value when it cannot be parsed.
 */
export function hostnameOf(url: string) {
  try {
    return new URL(url).host
  } catch {
    return url.replace(/^https?:\/\//, "")
  }
}
