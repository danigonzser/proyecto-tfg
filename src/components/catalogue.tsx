"use client"

import { CalendarIcon, ClockIcon } from "lucide-react"
import Link from "next/link"
import { getRelativeTimeString } from "@/lib/relativetime"
import { Catalogue } from "@prisma/client"
import CatalogueRemoval from "./catalogue_removal"

export default function CatalogueCard({ catalogue }: { catalogue: Catalogue }) {

  // const { toast } = useToast()

  // const [dialogOpened, setDialogOpened] = useState(false)
  // const [memeCount, setMemeCount] = useState<number>(0)

  // const [deletedCatalogue, setDeletedCatalogue] = useState<boolean>(false)
  // const isDeleted = useRef<boolean>(false)

  // function undoRemoveCatalogue() {
  //   setDeletedCatalogue(false)
  //   isDeleted.current = false
  // }

  // function preDialogRemoveCatalogue() {

  //   getMemesCountByCatalogueId(catalogue.id).then((count) => {

  //     if (count > 0) {
  //       setMemeCount(count)
  //       setDialogOpened(true)
  //     } else {
  //       preRemoveCatalogue()
  //     }

  //   })

  // }

  // function preRemoveCatalogue() {

  //   setDialogOpened(false)

  //   setDeletedCatalogue(true)
  //   isDeleted.current = true

  //   toast({
  //     title: "Catalogue removed!",
  //     variant: "destructive",
  //     action: (<ToastAction altText="Undo" onClick={undoRemoveCatalogue}>Undo</ToastAction>),
  //     duration: 6000,
  //     onSwipeEnd: () => {
  //       removeCatalogueById(catalogue.id)
  //     }
  //   })

  //   setTimeout(() => {
  //     if (isDeleted.current) {
  //       removeCatalogueById(catalogue.id)
  //     }
  //   }, 6500)
  // }

  return (

    <>
      <div className="group relative bg-card text-card-foreground rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 focus-within:ring-2 focus-within:ring-primary dark:shadow-black" >
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

        <CatalogueRemoval catalogueId={catalogue.id} />
      </div>
    </>
  )
}