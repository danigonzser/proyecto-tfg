import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "../globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import localfont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Meme editor',
  description: 'Meme online editor'
}

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="w-full h-full">
      {children}
    </main>
  )
}
