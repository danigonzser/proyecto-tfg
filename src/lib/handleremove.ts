"use server"
import { Catalogue } from "@prisma/client"
import prisma from "./db"
import { useToast } from "@/hooks/use-toast"
import { MutableRefObject } from "react"

export async function getMemesCountByCatalogueId(id: string) {

  return await prisma.meme.count({
    where: {
      catalogueId: id
    },
  })

}

export async function removeCatalogueById(id: string) {

  await prisma.meme.deleteMany({
    where: {
      catalogueId: id
    }
  })

  const catalogue = await prisma.catalogue.delete({
    where: {
      id: id
    }
  })

  if (catalogue === null) {
    throw new Error("Catalogue not found")
  }
}

export async function removeMemeById(id: string) {

  const meme = await prisma.meme.delete({
    where: {
      id: id
    }
  })

  if (meme === null) {
    throw new Error("Meme not found")
  }
}

export async function memeTimeoutRemoval(id: string, state: boolean, ref: MutableRefObject<boolean>) {

  setTimeout(() => {

    if (state) {
      removeMemeById(id)

    }
  }, 6000)
}

export async function catalogueTimeoutRemoval(id: string, state: boolean, ref: MutableRefObject<boolean>) {

  setTimeout(() => {

    if (state) {

      removeCatalogueById(id)
    }
  }, 6000)
}