import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import localfont from 'next/font/local'
import { usePathname } from "next/navigation"
import { CirclePlus, ClockIcon, ComputerIcon, FolderIcon, HomeIcon, Menu, Minus, Plus, PlusIcon, SaveIcon, SettingsIcon, ShareIcon, SpellCheckIcon, StarIcon, StoreIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import clsx from "clsx"
import { ModeToggle } from "@/components/mode-toggle-button"
import DrawerDialogDemo from "@/components/responsive-drawer"
import { Toaster } from "@/components/ui/toaster"
import { Metadata } from "next"

const Plush = localfont({ src: "../../src/components/ui/Plush-ExtraBold.woff2" })
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
