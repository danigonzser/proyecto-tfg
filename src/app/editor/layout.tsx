import type { Metadata } from "next"
import "../globals.css"

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
