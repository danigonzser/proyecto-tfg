"use client"
import { CalendarIcon, ClockIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { getRelativeTimeString } from "@/lib/relativetime"
import { Catalogue } from "@prisma/client"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "./ui/toast"
import { catalogueTimeoutRemoval, getMemesCountByCatalogueId, removeCatalogueById } from "@/lib/handleremove"
import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useRouter } from "next/navigation"

export default function CatalogueCard({ catalogue }: { catalogue: Catalogue }) {

  const { toast } = useToast()
  const router = useRouter()

  const [dialogOpened, setDialogOpened] = useState(false)
  const [memeCount, setMemeCount] = useState<number>(0)


  const [deletedCatalogue, setDeletedCatalogue] = useState<boolean>(false)
  const isDeleted = useRef<boolean>(false)

  function undoRemoveCatalogue() {
    setDeletedCatalogue(false)
    isDeleted.current = false
  }

  function preDialogRemoveCatalogue() {

    getMemesCountByCatalogueId(catalogue.id).then((count) => {

      if (count > 0) {
        setMemeCount(count)
        setDialogOpened(true)
      } else {
        preRemoveCatalogue()
      }

    })

  }

  function preRemoveCatalogue() {

    setDialogOpened(false)

    setDeletedCatalogue(true)
    isDeleted.current = true

    toast({
      title: "Catalogue removed!",
      variant: "destructive",
      action: (<ToastAction altText="Undo" onClick={undoRemoveCatalogue}>Undo</ToastAction>),
      duration: 6000
    })

    setTimeout(() => {
      if (isDeleted.current) {
        removeCatalogueById(catalogue.id)
        router.refresh()
      }
    }, 6000)
  }

  return (

    <>

      <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-black text-xl">This catalogue has {memeCount} meme(s)</DialogTitle>
            <DialogDescription>
              This action can be undone but then, the catalogue will be permanently delete from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDialogOpened(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => preRemoveCatalogue()}
            >
              Remove catalogue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className={cn("group relative bg-card text-card-foreground rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 focus-within:ring-2 focus-within:ring-primary dark:shadow-black", { "hidden": deletedCatalogue })} >
        <Link
          href={`/catalogues/${catalogue.id}`}
          className="block p-4 focus:outline-none">
          <h2 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors duration-200">
            {catalogue.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-2 truncate">{catalogue.description}</p>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span suppressHydrationWarning>Updated: {getRelativeTimeString(catalogue.updatedAt, "en")}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span suppressHydrationWarning>Created: {getRelativeTimeString(catalogue.createdAt, "en")}</span>
          </div>
        </Link>
        <Button
          variant="destructive"
          size="icon"
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => preDialogRemoveCatalogue()}
        >
          <Trash2Icon className="h-4 w-4" />
          <span className="sr-only">Remove catalogue</span>
        </Button>
      </div>
    </>
  )
}