"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { useEffect, useState } from "react"
import { getMemesCountByCatalogueId, removeCatalogueByIdAction } from "@/lib/handleremove"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer"

export default function CatalogueRemoval({
  catalogueId,
}: {
  catalogueId: string
}) {
  const [dialogOpened, setDialogOpened] = useState(false)
  const [memeCount, setMemeCount] = useState<number>(0)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    getMemesCountByCatalogueId(catalogueId).then((count) => {
      setMemeCount(count)
    })
  })

  return (
    <>

      {isDesktop ? (
        <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle
                className="font-black text-xl"
                data-cy="catalogue_count"
              >
                You are about to remove this catalogue{memeCount > 0
                  && ` with ${memeCount} meme(s)`}. Are you sure?
              </DialogTitle>
              <DialogDescription>
                {memeCount > 0
                  ? `This catalogue contains ${memeCount} memes which will be permanently deleted with this catalogue from our servers.`
                  : "This action cannot be undone, the catalogue will be permanently delete from our servers."}

              </DialogDescription>
            </DialogHeader>
            <DialogFooter>

              <Button
                variant="ghost"
                onClick={() => setDialogOpened(false)}
                data-cy="cancel_remove_approve_button"
              >
                Cancel
              </Button>

              <form action={removeCatalogueByIdAction} className="inline-block">
                <input type="hidden" name="id" value={catalogueId} />

                <Button
                  variant="destructive"
                  type="submit"
                  data-cy="submit_remove_approve_button"
                  onClick={() => setDialogOpened(false)}
                >
                  Remove catalogue
                </Button>

              </form>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={dialogOpened} onOpenChange={setDialogOpened}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle
                className="font-black text-xl"
                data-cy="catalogue_count"
              >
                You are about to remove this catalogue{memeCount > 0
                  && ` with ${memeCount} meme(s)`}. Are you sure?
              </DrawerTitle>
              <DrawerDescription>
                {memeCount > 0
                  ? `This catalogue contains ${memeCount} memes which will be permanently deleted with this catalogue from our servers.`
                  : "This action cannot be undone, the catalogue will be permanently delete from our servers."}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="flex-row justify-end space-x-2 gap-y-2">

              <Button
                variant="ghost"
                onClick={() => setDialogOpened(false)}
                data-cy="cancel_remove_approve_button"
              >
                Cancel
              </Button>

              <form action={removeCatalogueByIdAction} className="inline-block">
                <input type="hidden" name="id" value={catalogueId} />

                <Button
                  variant="destructive"
                  type="submit"
                  data-cy="submit_remove_approve_button"
                  onClick={() => setDialogOpened(false)}
                >
                  Remove catalogue
                </Button>

              </form>

            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <Button
        variant="destructive"
        size="icon"
        className="absolute bottom-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => setDialogOpened(true)}
      >
        <Trash2Icon className="h-4 w-4" />
        <span className="sr-only">Remove catalogue</span>
      </Button>
    </>
  )
}
