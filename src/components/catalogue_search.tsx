'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"

import prisma from '@/lib/db'
import { useEffect, useState } from "react"
import type { Catalogue } from "@prisma/client"

// Passing state in props
export default function CatalogueSearch() {

  const [loading, setLoading] = useState(false)
  const [catalogues, setCatalogues] = useState([] as Catalogue[])

  useEffect(() => {

    async function getItems() {
      setLoading(true)
      const res = await prisma.catalogue.findMany()
      setCatalogues(res)
      setLoading(false)
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