"use server"
import { Catalogue } from "@prisma/client"
import prisma from "./db"


export async function getCatalogues(): Promise<Catalogue[]> {
  const cats = await prisma.catalogue.findMany()
  return cats
}

export async function getCataloguesWithQuery(query: string) {
  if (query === '') {
    return await prisma.catalogue.findMany()
  } else {
    return await prisma.catalogue.findMany({
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
}

export async function setMemeInCatalogue(catalogueId: string, memeName: string, memeJson: string) {
  await prisma.meme.create({
    data: {
      description: "",
      catalogueId: catalogueId,
      title: memeName,
      imageJson: memeJson
    }
  })
}

export async function setMemeByIdInCatalogue(memeId: string, memeJson: string) {
  await prisma.meme.update({
    where: {
      id: memeId
    },
    data: {
      imageJson: memeJson
    }
  })
}