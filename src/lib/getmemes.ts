"use server"
import { Catalogue, Meme } from "@prisma/client"
import prisma from "./db"

export async function getCatalogueById(id: string): Promise<Catalogue> {
  const catalogue = await prisma.catalogue.findFirst({
    where: {
      id: id
    }
  })

  if (catalogue === null) {
    throw new Error("Catalogue not found")
  }

  return catalogue
}

export async function getMemesByCatalogue(catalogueId: string): Promise<Meme[]> {
  const memes = await prisma.meme.findMany({
    where: {
      catalogueId: catalogueId
    }
  })

  return memes
}

export async function getMemeById(id: string): Promise<Meme> {
  const meme = await prisma.meme.findFirst({
    where: {
      id: id
    }
  })

  if (meme === null) {
    throw new Error("Meme not found")
  }

  return meme
}