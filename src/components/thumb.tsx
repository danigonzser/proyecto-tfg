import Image from "next/image"
import { getRelativeTimeString } from "@/lib/relativetime"
import { Button } from "./ui/button"
import { Edit, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ToastAction } from "./ui/toast"
import { useToast } from "@/hooks/use-toast"
import { useRef, useState } from "react"
import { memeTimeoutRemoval, removeMemeById } from "@/lib/handleremove"
import { useRouter } from "next/navigation"

export function Thumb({
  dataUrl,
  memeName,
  memeCreatedAt,
  memeUpdatedAt,
  catalogueId,
  memeId
}: {
  dataUrl: string,
  memeName: string,
  memeCreatedAt: Date,
  memeUpdatedAt: Date,
  catalogueId: string,
  memeId: string
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
        removeMemeById(memeId)
        router.refresh()
      }
    }, 6000)
  }

  return (

    <div className={cn("w-full max-w-sm relative group rounded-lg overflow-hidden", { "hidden": deletedMeme })} id={memeId}>
      <Image
        src={dataUrl}
        alt="thumbnail"
        width={384}
        height={384}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ aspectRatio: "300/300", objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="self-end gap-4">
          <Link href={`/editor/${memeId}`}>
            <Button
              variant="secondary"
              size="icon"
              className="w-10 h-10 mr-3"
            >
              <Edit className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => preRemoveMeme()}
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">Remove catalogue</span>
          </Button>
        </div>
        <div>
          <h1 className="text-primary text-2xl font-bold mb-1">{memeName}</h1>
          <p className="text-muted-foreground text-sm mb-2" suppressHydrationWarning>
            Created {getRelativeTimeString(memeCreatedAt, "en")}
          </p>
          <p className="text-muted-foreground text-sm" suppressHydrationWarning>
            Updated {getRelativeTimeString(memeUpdatedAt, "en")}
          </p>
        </div>
      </div>
    </div >

  )
} 