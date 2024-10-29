import { classRegistry, FabricImage, ImageProps, Point, Rect, StaticCanvas } from "fabric"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Skeleton } from "./ui/skeleton"

export class DeadRect extends Rect {
  static get type() {
    return 'DeadRect'
  }
  constructor(options = {}) {
    super(options)
    this.evented = false
    this.selectable = false
  }

  toDatalessObject(propertiesToInclude?: unknown[]) {
    return {
      ...super.toDatalessObject(propertiesToInclude),
    }
  }
}

classRegistry.setClass(DeadRect)
classRegistry.setSVGClass(DeadRect)

export class DeadImage extends FabricImage {
  static get type() {
    return 'DeadImage'
  }

  constructor(elementId: string, options?: Partial<ImageProps> | undefined) {
    super(elementId, options)
    this.evented = false
    this.selectable = false
  }

  toDatalessObject(propertiesToInclude?: unknown[]) {
    return {
      ...super.toDatalessObject(propertiesToInclude),
    }
  }
}

classRegistry.setClass(DeadImage)
classRegistry.setSVGClass(DeadImage)

export function Thumbnail({ memeJSON }: { memeJSON: string }) {

  const canvasRef = useRef<string | HTMLCanvasElement | undefined>(undefined)

  const [dataUrl, setDataUrl] = useState<string | StaticImport>("/vercel.svg")

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const canvas = new StaticCanvas(canvasRef.current, { backgroundColor: 'white' })
    canvas.setDimensions({ width: 1000, height: 500 })

    canvas.loadFromJSON(memeJSON).then((canvas) => {

      canvas.getObjects().forEach((o) => {
        if (o.type === "deadrect") {
          canvas.height = o.height
          canvas.width = o.width
          canvas.absolutePan(new Point({ x: o.left, y: o.top }))
        }
      })

      canvas.renderAll()

      setDataUrl(canvas.toDataURL())

      setIsLoading(false)

    })

    return () => {
      canvas.dispose()
    }

  }, [canvasRef, memeJSON])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[1920px] w-[1080px] bg-muted-foreground/20 rounded-xl" />
      ) : (
        <Image
          src={dataUrl}
          alt="thumbnail"
          width={1920}
          height={1080}
          className="w-full rounded-xl"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />
      )}
    </>

  )

}