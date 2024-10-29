import Thumbs from "@/components/thumbs"
import { getCatalogueById } from "@/lib/getmemes"
import { Suspense } from "react"
import type { Metadata } from 'next'
import CatalogueNav from "@/components/catalogue_navegation"

export async function generateMetadata(
  props: {
    params: Promise<{
      id: string
    }>
  }): Promise<Metadata> {
  const params = await props.params
  // read route params
  const id = params.id

  const catalogue = await getCatalogueById(id)

  return {
    title: `${catalogue.title} | Catalogue`
  }
}

export default async function CatalogueMemes(
  props: {
    params: Promise<{
      id: string
    }>
  }
) {
  const params = await props.params

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