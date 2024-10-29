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
import { useState } from "react"
import { removeMemeByIdAction } from "@/lib/handleremove"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer"

export default function MemeRemoval({
  memeId,
  memeCatalogueId
}: {
  memeId: string,
  memeCatalogueId: string
}) {

  const [dialogOpened, setDialogOpened] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

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
                You are about to remove this meme. Are you sure?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone, the meme will be permanently delete from our servers.
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
              <form action={removeMemeByIdAction} className="inline-block">
                <input type="hidden" name="id" value={memeId} />
                <input type="hidden" name="catalogueid" value={memeCatalogueId} />
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
        </Dialog>) : (
        <Drawer open={dialogOpened} onOpenChange={setDialogOpened}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle
                className="font-black text-xl"
                data-cy="catalogue_count"
              >
                You are about to remove this meme. Are you sure?
              </DrawerTitle>
              <DrawerDescription>
                This action cannot be undone, the meme will be permanently delete from our servers.
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
              <form action={removeMemeByIdAction} className="inline-block">
                <input type="hidden" name="id" value={memeId} />
                <input type="hidden" name="catalogueid" value={memeCatalogueId} />
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
        className="shadow-sm shadow-black"
        onClick={() => setDialogOpened(true)}
      >
        <Trash2Icon className="h-4 w-4" />
        <span className="sr-only">Remove meme</span>
      </Button>

    </>
  )
}
