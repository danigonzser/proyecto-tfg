'use client'
import { useMediaQuery } from "@/hooks/use-media-query"
import React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { FileImage, Pencil } from "lucide-react"
import Link from "next/link"

export function DrawerDialogDemo() {
  'use client'
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"default"}
            className="text-lg w-full my-4  hover:shadow[#facc15ff]-2xl shadow[#facc15ff]-xl"
            role="button">New meme
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DrawerHeader>
            <DrawerTitle>Create new meme from:</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 w-full h-full">
            <div className="grid grid-cols-2 justify-between">
              <Link href="/editor" passHref>
                <Button variant="ghost" className="w-full flex flex-col items-center justify-center h-25 w-25">
                  <Pencil className="w-10 h-10" />
                  <span className="mt-3 text-xl">Editor</span>
                </Button>
              </Link>
              <Button variant="ghost" className="flex flex-col items-center justify-center h-25 w-25">
                <FileImage className="w-10 h-10" />
                <span className="mt-3 text-xl">Image</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog >
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button className="w-full">New meme</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create new meme from:</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 w-full h-full">
          <div className="grid grid-cols-2 justify-between">
            <Button variant="ghost" className="flex flex-col items-center justify-center h-25 w-25">
              <Pencil className="w-10 h-10" />
              <span className="mt-3 text-xl">Editor</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center justify-center h-25 w-25">
              <FileImage className="w-10 h-10" />
              <span className="mt-3 text-xl">Image</span>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerDialogDemo