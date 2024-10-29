'use server'

import prisma from '@/lib/db'
import { Catalogue } from "@prisma/client"
import Image from "next/image"
import CatalogueCard from "./catalogue"

export default async function Catalogues({
  query,
}: {
  query: string
}) {

  let catalogues: Catalogue[] = []

  if (query === '') {
    catalogues = await prisma.catalogue.findMany()
  } else {
    catalogues = await prisma.catalogue.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' as const } },
          { description: { contains: query, mode: 'insensitive' as const } }
        ]
      }
    })
  }

  return (
    <>
      {catalogues.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-16 md:mt-20 ">
          <Image src="/seriously.svg" width={500} height={500} alt="No memes available" />
          <p className="text-center text-muted-foreground">What? No catalogue?</p>
          <p className="text-center text-muted-foreground">Go and create a new one</p>
          <div className="flex items-center gap-4 justify-start md:justify-center">
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {catalogues.map((catalogue, key) => (
            <CatalogueCard key={key} catalogue={catalogue} />
          ))}
        </div>
      )}
    </>
  )

}