import { CalendarIcon, ClockIcon, Trash2Icon } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"

export function CataloguesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">

      {[...Array(30)].map((_, key) => (
        <div
          key={key}
          className="group bg-card text-card-foreground rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-black"
        >
          <div className="p-4">
            <Skeleton className="w-24 h-6 bg-muted-foreground/20 mb-2" />
            {/* <h2 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors duration-200">
              {catalogue.title}
            </h2> */}
            <Skeleton className="w-full h-4 bg-muted-foreground/20 mb-2" />
            {/* <p className="text-lg text-muted-foreground mb-2 truncate">{catalogue.description}</p> */}
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <ClockIcon className="w-4 h-4 mr-1" />
              {/* <span>Updated: {getRelativeTimeString(catalogue.updatedAt, "en")}</span> */}
              <Skeleton className="w-24 h-4 bg-muted-foreground/20" />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {/* <span>Created: {getRelativeTimeString(catalogue.createdAt, "en")}</span> */}
              <Skeleton className="w-24 h-4 bg-muted-foreground/20" />
            </div>
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          // onClick={handleRemove}
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">Remove catalogue</span>
          </Button>
        </div>
      ))}
    </div>
  )
}