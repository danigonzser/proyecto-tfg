import { Skeleton } from "./ui/skeleton"

export default function MemesSkeleton() {
  return (
    <div className="flex flex-col content-center items-center px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(30)].map((key) => (
          <div key={key}>
            <Skeleton key={key} className="h-[225px] w-[400px] bg-muted-foreground/20 rounded-xl" />
          </div>
        ))}
      </div >
    </div >
  )
}