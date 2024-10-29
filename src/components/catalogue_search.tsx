'use client'

import {
  CommandEmpty,
  CommandItem,
  CommandList
} from "@/components/ui/command"

import prisma from '@/lib/db'
import { useEffect, useState } from "react"
import type { Catalogue } from "@prisma/client"

// Passing state in props
export default function CatalogueSearch() {

  const [catalogues, setCatalogues] = useState([] as Catalogue[])

  useEffect(() => {

    async function getItems() {
      const res = await prisma.catalogue.findMany()
      setCatalogues(res)
    }

    getItems()

  }, [])

  return (

    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>

      {catalogues.map((catalogue) => {
        return (
          <CommandItem key={catalogue.id}>
            {catalogue.title}
          </CommandItem>
        )
      })}
    </CommandList>

  )

}