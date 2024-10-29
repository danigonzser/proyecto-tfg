"use server"

import prisma from "@/lib/db"
import { Folder, Slash } from "lucide-react"
import Link from "next/link"

export default async function CatalogueNav({ paramId }: { paramId: string }) {

  const catalogueName = await prisma.catalogue.findUnique({
    where: {
      id: paramId
    }
  })

  return (
    <>
      <Link href={"/"}> <Folder className="stroke-primary" /></Link> <Slash />{catalogueName?.title}
    </>
  )
}