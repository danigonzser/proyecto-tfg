import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function logFontData() {
  try {
    const availableFonts = await (window as any).queryLocalFonts()
    for (const fontData of availableFonts) {




    }
  } catch (err) {
    console.error("error")
  }
}