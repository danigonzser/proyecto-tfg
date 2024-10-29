"use server"

import type { Metadata } from 'next'
import prisma from '@/lib/db'
import EditMemeClient from '@/components/edit_meme_client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {

  const id = (await params).id

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

export default async function EditMeme({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const id = (await params).id

  return <EditMemeClient memeId={id} />
}