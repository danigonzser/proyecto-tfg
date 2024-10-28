"use client"

import { getRelativeTimeString } from "@/lib/relativetime"
import { Button } from "./ui/button"
import { Edit, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ToastAction } from "./ui/toast"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useRef, useState } from "react"
import { memeTimeoutRemoval, removeMemeById } from "@/lib/handleremove"
import { useRouter } from "next/navigation"
import { Canvas, classRegistry, FabricImage, ImageProps, Point, Rect, StaticCanvas } from "fabric"
import { Meme } from "@prisma/client"
import { Thumbnail } from "./thumbnail"

export function Thumb({
  meme
}: {
  meme: Meme
}) {

  const { toast } = useToast()
  const router = useRouter()

  const [deletedMeme, setDeletedMeme] = useState<boolean>(false)
  const isDeleted = useRef<boolean>(false)

  function undoRemoveMeme() {
    setDeletedMeme(false)
    isDeleted.current = false
  }

  function preRemoveMeme() {

    setDeletedMeme(true)
    isDeleted.current = true

    toast({
      title: "Meme removed!",
      variant: "destructive",
      action: (<ToastAction altText="Undo" onClick={undoRemoveMeme}>Undo</ToastAction>),
      duration: 6000
    })

    setTimeout(() => {
      if (isDeleted.current) {
        removeMemeById(meme.id)
        router.refresh()
      }
    }, 6000)
  }

  return (

    <div className={cn("max-h-fit relative group rounded-lg overflow-hidden", { "hidden": deletedMeme })} id={meme.id}>
      <Thumbnail memeJSON={meme.imageJson} />
      <div className="absolute inset-0 bg-transparent md:bg-black/70 flex flex-col justify-between p-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="self-end gap-4">
          <Link href={`/editor/${meme.id}`}>
            <Button
              variant="default"
              size="icon"
              className="w-10 h-10 mr-3 shadow-sm shadow-black"
            >
              <Edit className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="icon"
            className="shadow-sm shadow-black"
            onClick={() => preRemoveMeme()}
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">Remove catalogue</span>
          </Button>
        </div>
        <div>
          <h1 className="text-primary text-lg font-bold mb-1 shadow-background md:shadow-none [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">{meme.title}</h1>
          <p className="text-muted md:text-muted-foreground text-xs mb-1 shadow-muted md:shadow-none [text-shadow:_0_1px_2px_var(--tw-shadow-color)]" suppressHydrationWarning>
            Created {getRelativeTimeString(meme.createdAt, "en")}
          </p>
          <p className="text-muted md:text-muted-foreground text-xs mb-1 shadow-muted md:shadow-none [text-shadow:_0_1px_2px_var(--tw-shadow-color)]" suppressHydrationWarning>
            Updated {getRelativeTimeString(meme.updatedAt, "en")}
          </p>
        </div>
      </div>
    </div>

  )
} 