'use client'

import "../globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import localfont from 'next/font/local'
import { usePathname } from "next/navigation"
import { CirclePlus, ClockIcon, ComputerIcon, Folder, FolderIcon, HomeIcon, Menu, Minus, Moon, Plus, PlusIcon, SaveIcon, SettingsIcon, ShareIcon, Smile, SpellCheckIcon, StarIcon, StoreIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import clsx from "clsx"
import { ModeToggle } from "@/components/mode-toggle-button"
import DrawerDialogDemo from "@/components/responsive-drawer"
import Search from "@/components/search"
import { useState } from "react"
import { Metadata } from "next"

const Plush = localfont({ src: "../../../src/components/ui/Plush-ExtraBold.woff2" })

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen text-foreground bg-secondary">
      <header className="fixed top-0 left-0 right-0 bg-secondary/50 backdrop-blur-md z-10">
        <div className="flex justify-between items-center gap-8 py-4 align-middle xl:container mx-auto px-4 sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:items-center">

          <div className="flex items-center justify-end md:justify-center">
            <Link href="/">
              <Image
                src="/icon.svg"
                width={50}
                height={50}
                alt="Picture of the logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </Link>
          </div>

          <div className="flex sm:justify-center justify-starr">
            {pathname === "/" && (
              <h1 className="text-xl font-bold">Catalogues</h1>
            )}
            {pathname.includes("/catalogues") && (
              <h1 className="text-xl font-bold">Memes</h1>
            )}
          </div>

          <div className="flex items-center gap-4 justify-start md:justify-center">
            <ModeToggle />
            <Link href="/editor">
              <Button
                className="sm:text-base md:text-lg md:py-2.5 md:px-4 py-1.5 px-2 text-xl drop-shadow-md hover:drop-shadow-xl shadow-sm shadow-primary/50 dark:shadow-sm dark:shadow-primary/80 hover:scale-110 transition-all duration-300 bg-primary text-primary-foreground border-primary font-black"
                role="button">Create meme
              </Button>
            </Link>
          </div>

        </div>
      </header>

      <main className="flex-grow pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto w-full px-5 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
