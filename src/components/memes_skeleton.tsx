import { Edit, Trash2Icon } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"

export function CataloguesSkeleton() {
  return (
    [...Array(30)].map((key) => (
      <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="max-h-fit relative group rounded-lg overflow-hidden">
          <Skeleton className="h-[210px] bg-muted-foreground/20 rounded-xl w-full" style={{ aspectRatio: "16/9", objectFit: "cover" }} />
          <div className="absolute inset-0 bg-transparent md:bg-black/70 flex flex-col justify-between p-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="self-end gap-4">
              <Button
                variant="default"
                size="icon"
                className="w-10 h-10 mr-3 shadow-sm shadow-black"
              >
                <Edit className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>

              <Button
                variant="destructive"
                size="icon"
                className="shadow-sm shadow-black"
              >
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">Remove meme</span>
              </Button>

            </div>
            <div>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>
      </div>
    ))
  )
}