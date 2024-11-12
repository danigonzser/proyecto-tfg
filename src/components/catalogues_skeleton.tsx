import { Skeleton } from "./ui/skeleton"

export function CataloguesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">

      {[...Array(10)].map((_, key) => (
        <div
          key={key}
          className="group bg-card text-card-foreground rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-black"
        >
          <div className="p-4">
            <Skeleton className="w-24 h-6 bg-muted-foreground/20 mb-2" />
            <Skeleton className="w-full h-4 bg-muted-foreground/20 mb-2" />
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Skeleton className="w-24 h-4 bg-muted-foreground/20" />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Skeleton className="w-24 h-4 bg-muted-foreground/20" />
            </div>
          </div>

        </div>
      ))}
    </div>
  )
}