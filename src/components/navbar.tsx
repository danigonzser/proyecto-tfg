"use client"

import { ModeToggle } from "./mode-toggle-button"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { buttonVariants } from "@/components/ui/button"
import clsx from "clsx"

function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="flex min-h-screen w-full flex-col bg-muted/40 py-5">
      <div className="flex justify-between mx-5">
        <div className="flex gap-x-2 items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              <Image
                src="/icon.svg"
                width={50}
                height={50}
                alt="Picture of the logo"
              />
            </h1>
          </Link>
          <Link href="/editor" className={clsx(
            buttonVariants({ variant: pathname === "/editor" ? "secondary" : "outline" })
            // '"link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
          )}>
            Editor ✏️
          </Link>
        </div>

        <div className="flex gap-x-2 items-center">
          <ModeToggle />
        </div>
      </div>
    </nav >
  )
}

export default Navbar