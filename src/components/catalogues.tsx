'use server'

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import prisma from '@/lib/db'
import { getRelativeTimeString } from "@/lib/relativetime"
import { Catalogue } from "@prisma/client"
import { CalendarIcon, ClockIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CreateCatalogues from "./create_catalogues"
import { Button } from "./ui/button"
import { removeCatalogueById } from "@/lib/handleremove"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { useEffect, useState } from "react"
import { getCataloguesWithQuery } from "@/lib/getcatalogues"
import { RemoveCatalogue } from "./remove_catalogue"
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
        title: {
          search: `${query}`
        },
        description: {
          search: `${query}`
        }
      }
    })
  }

  return (
    <>
      {catalogues.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
          <Image src="/seriously.svg" width={500} height={500} alt="No memes available" />
          <p className="text-center text-muted-foreground">What? No memes?</p>
          <p className="text-center text-muted-foreground">Go and create a new one</p>
          <div className="flex items-center gap-4 justify-start md:justify-center">
            <CreateCatalogues />
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