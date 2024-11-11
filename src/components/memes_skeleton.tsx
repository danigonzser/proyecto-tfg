import { Skeleton } from "./ui/skeleton"

export default function MemesSkeleton() {
  return (
    <div className="flex flex-col content-center items-center px-4 py-8">
      {[...Array(30)].map((key) => (
        <Skeleton key={key} className="h-[225px] w-[400px] bg-muted-foreground/20 rounded-xl" />
      ))}
    </div >
  )
}