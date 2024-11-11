import { Skeleton } from "./ui/skeleton"

export default function MemesSkeleton() {
  return (
    [...Array(30)].map((key) => (
      <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-[225px] w-[400px] bg-muted-foreground/20 rounded-xl" />
      </div>
    ))
  )
}