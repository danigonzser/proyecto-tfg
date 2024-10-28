import Thumbs from "@/components/thumbs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import prisma from "@/lib/db"
import { getCatalogues } from "@/lib/getcatalogues"
import { getCatalogueById, getMemesByCatalogue } from "@/lib/getmemes"
import { getRelativeTimeString } from "@/lib/relativetime"
import { Meme } from "@prisma/client"
import { Canvas, classRegistry, FabricImage, ImageProps, Point, Rect, StaticCanvas } from "fabric"
import { Suspense, useEffect, useRef, useState } from "react"
import { set } from "zod"
import { Separator } from "@/components/ui/separator"
import type { Metadata, ResolvingMetadata } from 'next'
import CatalogueNav from "@/components/catalogue_navegation"

export async function generateMetadata(
  { params }: {
    params: {
      id: string
    }
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  const catalogue = await getCatalogueById(id)

  return {
    title: `${catalogue.title} | Catalogue`
  }
}

export default function CatalogueMemes({ params }: {
  params: {
    id: string
  }
}) {

  return (

    <>
      <div className="flex-row flex justify-center">
        <h1 className="text-xl font-bold flex-row flex gap-4">
          <Suspense fallback={<div>Loading title...</div>}>
            <CatalogueNav paramId={params.id} />
          </Suspense>
        </h1>
      </div >
      <Suspense fallback={<div>Loading memes...</div>}>
        <Thumbs paramId={params.id} />
      </Suspense>
    </>

  )

}