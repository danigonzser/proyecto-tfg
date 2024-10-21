"use client"
import { Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { removeCatalogueById } from "@/lib/handleremove"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { Catalogue } from "@prisma/client"
import { useState } from "react"

export async function RemoveCatalogue({ id, catalogues }: { id: string, catalogues: Catalogue[] }) {

  const { toast } = useToast()

  const [deletedCatalogue, setDeletedCatalogue] = useState<string>("")

  function preRemoveCatalogue() {

    // Store the deleted catalogue
    setDeletedCatalogue(id)

    catalogues.filter((catalogue) => { return catalogue.id !== id })

    toast({
      title: "Catalogue removed!",
      action: (<ToastAction altText="Undo">Undo</ToastAction>),
      duration: 5999
    })

    setTimeout(() => {
      if (deletedCatalogue) {
        removeCatalogueById(deletedCatalogue)
      }
    }, 6000)
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      onClick={() => preRemoveCatalogue()}
    >
      <Trash2Icon className="h-4 w-4" />
      <span className="sr-only">Remove catalogue</span>
    </Button>
  )

}