import type { Metadata, ResolvingMetadata } from 'next'
import FabricCanvas from "@/components/fabric-canvas"
import prisma from '@/lib/db'

export async function generateMetadata(
  { params }: {
    params: {
      id: string
    }
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  const meme = await prisma.meme.findUnique({
    where: {
      id: id
    }
  })

  if (!meme) return {
    title: `Meme not found | Meme editor`
  }

  return {
    title: `${meme.title} | Meme editor`
  }
}

export default function EditMeme({ params }: {
  params: {
    id: string
  }
}) {
  return (
    <div className="h-full w-full">
      <FabricCanvas memeId={params.id} />
    </div>
  )
}