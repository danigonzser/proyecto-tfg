import React, { Suspense } from "react"
import Catalogues from "@/components/catalogues"
import Search from "@/components/search"
import CreateCatalogues from "@/components/create_catalogues"
import { Metadata } from "next"
import { CataloguesSkeleton } from "@/components/catalogues_skeleton"

export const metadata: Metadata = {
  title: 'Catalogues',
}

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string
    }>
  }
) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || ''

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-2">
        <Search placeholder="Search catalogues..." />
        <CreateCatalogues />
      </div>
      <Suspense key={query} fallback={<CataloguesSkeleton />}>
        <Catalogues query={query} />
      </Suspense>
    </>
  )
}