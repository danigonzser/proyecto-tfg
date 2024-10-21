"use client"
import * as fabric from 'fabric'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { classRegistry, FabricImage, ImageProps, Point, Rect, StaticCanvas } from 'fabric'
import { getCatalogueById, getMemesByCatalogue } from '@/lib/getmemes'
import { Thumb } from './thumb'
import Image from 'next/image'
import { Meme } from '@prisma/client'
import { Separator } from './ui/separator'
import { Folder, Slash } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb'
import { Metadata } from 'next'

export class DeadRect extends Rect {
  static get type() {
    return 'DeadRect'
  }
  constructor(options = {}) {
    super(options)
    this.evented = false
    this.selectable = false
  }

  toDatalessObject(propertiesToInclude?: any[]) {
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

  toDatalessObject(propertiesToInclude?: any[]) {
    return {
      ...super.toDatalessObject(propertiesToInclude),
    }
  }
}

classRegistry.setClass(DeadImage)
classRegistry.setSVGClass(DeadImage)

type MemeData = {
  title: string
  imageJson: string
  createdAt: Date
  updatedAt: Date
  id: string
}

async function getMemes(paramId: string): Promise<Meme[]> {
  return await getMemesByCatalogue(paramId)
}

export default function Thumbs({ paramId }: { paramId: string }) {

  const [memeData, setMemeData] = useState<MemeData[]>([])

  const [catalogueName, setCatalogueName] = useState<string>("")

  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<StaticCanvas | null>(null)

  const renderAfterCalled = useRef(false)

  useEffect(() => {

    const loadCatalogueName = async () => {
      const catalogue = await getCatalogueById(paramId)
      setCatalogueName(catalogue.title)
    }

    const loadMemes = async () => {

      const memes = await getMemes(paramId)

      const newMemeData: MemeData[] = []

      const canvas = new fabric.StaticCanvas("", {
        height: 0,
        width: 0,
      })

      canvasRef.current = canvas

      await new Promise((resolve) => {

        memes.forEach((meme) => {

          canvas.loadFromJSON(meme.imageJson).then((canvas) => {

            canvas.getObjects().forEach((o) => {
              if (o.type === "deadrect") {
                canvas.height = o.height
                canvas.width = o.width
                canvas.absolutePan(new Point({ x: o.left, y: o.top }))
              }
            })

            canvas.renderAll()

            newMemeData.push({
              title: meme.title,
              imageJson: canvas.toDataURL(),
              createdAt: meme.createdAt,
              updatedAt: meme.updatedAt,
              id: meme.id,
            })
          })

        })

        setMemeData(newMemeData)
        resolve(true)
      })
    }

    if (!renderAfterCalled.current) {
      loadCatalogueName()

      loadMemes().then(() => { setLoading(false) })
    }

    renderAfterCalled.current = true

    return () => {
      canvasRef.current?.dispose()
    }
  })

  // Repeat skeleton memes.length times
  if (loading) {
    return (
      <>
        <div className="flex-row flex justify-center align-middle">
          <h1 className="text-xl font-bold flex-row flex gap-4">
            <Folder /> <Slash /> <Skeleton className="w-[250px] bg-foreground/50" />
          </h1>
        </div>
        <div className="flex flex-col content-center items-center px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(10)].map((_, key) => (
              <div className="w-full max-w-sm relative group rounded-lg overflow-hidden" key={key}>
                <Skeleton className="w-[384px] h-[384px] object-cover bg-muted-foreground/20" />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex-row flex justify-center">
        <h1 className="text-xl font-bold flex-row flex gap-4">
          <Link href={"/"}> <Folder className="stroke-primary" /></Link> <Slash />{catalogueName}
        </h1>
      </div >
      <div className="flex flex-col content-center items-center px-4 py-8">
        {memeData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <Image src="/what.svg" width={500} height={500} alt="No memes available" />
            <p className="text-center text-muted-foreground">What? No memes?</p>
            <div className="flex items-center gap-4 justify-start md:justify-center">
              <Link href="/editor">
                <Button
                  className="sm:text-base md:text-lg md:py-2.5 md:px-4 py-1.5 px-2 text-xl drop-shadow-md hover:drop-shadow-xl shadow-sm shadow-primary/50 dark:shadow-sm dark:shadow-primary/80 hover:scale-110 transition-all duration-300 bg-primary text-primary-foreground border-primary font-black"
                  role="button">Create meme
                </Button>
              </Link>
            </div>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<div>Loading...</div>}>
              {memeData.map((meme, key) => (
                <Thumb
                  dataUrl={meme.imageJson}
                  memeName={meme.title}
                  memeCreatedAt={meme.createdAt}
                  memeUpdatedAt={meme.updatedAt}
                  memeId={meme.id}
                  catalogueId={paramId}
                  key={key}
                />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </>
  )
}
