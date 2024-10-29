import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import localfont from 'next/font/local'
import { Toaster } from "@/components/ui/toaster"
import { Metadata } from "next"

const Vollkorn = localfont({ src: "../../src/components/ui/Vollkorn-VariableFont_wght.ttf" })

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Memes for all',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="w-full h-full">
      <body
        className={cn(
          "antialiased w-full h-full",
          Vollkorn.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html >
  )
}
