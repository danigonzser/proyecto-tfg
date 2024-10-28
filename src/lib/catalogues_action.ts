import prisma from "./db"

export async function getCatalogues(query: string) {
  if (query === '') {
    return await prisma.catalogue.findMany()
  } else {
    return await prisma.catalogue.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' as const } },
          { description: { contains: query, mode: 'insensitive' as const } }
        ]
      }
    })
  }
}