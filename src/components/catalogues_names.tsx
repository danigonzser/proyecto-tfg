'use server'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import prisma from '@/lib/db'

export default async function CataloguesNames() {

  const catalogues = await prisma.catalogue.findMany()

  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Your catalogues">
        {
          catalogues.map((catalogue) => (
            <CommandItem key={catalogue.id}>{catalogue.title}</CommandItem>
          ))
        }
      </CommandGroup>
    </CommandList>

  )

}