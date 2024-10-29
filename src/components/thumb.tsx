"use client"

import { getRelativeTimeString } from "@/lib/relativetime"
import { Button } from "./ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"
import { Meme } from "@prisma/client"
import { Thumbnail } from "./thumbnail"
import MemeRemoval from "./meme_removal"

export function Thumb({
  meme, memeCatalogueId
}: {
  meme: Meme,
  memeCatalogueId: string
}) {

  return (

    <div className="max-h-fit relative group rounded-lg overflow-hidden" id={meme.id}>
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

          <MemeRemoval memeId={meme.id} memeCatalogueId={memeCatalogueId} />

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