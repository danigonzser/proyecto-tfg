"use server"

import { Thumb } from './thumb'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import prisma from '@/lib/db'
import { Suspense } from 'react'

export default async function Thumbs({ paramId }: { paramId: string }) {

  const memes = await prisma.meme.findMany({
    where: {
      catalogueId: paramId
    }
  })

  return (<>
    <div className="flex flex-col content-center items-center px-4 py-8">
      {memes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
          <Image src="/what.svg" width={500} height={500} alt="No memes available" />
          <p className="text-center text-muted-foreground">What? No memes?</p>
          <div className="flex items-center gap-4 justify-start md:justify-center">
            <Link href="/editor">
              <Button
                className="sm:text-base md:text-lg md:py-2.5 md:px-4 py-1.5 px-2 text-xl drop-shadow-md hover:drop-shadow-xl shadow-sm shadow-primary/50 dark:shadow-sm dark:shadow-primary/80 hover:scale-110 transition-all duration-300 bg-primary text-primary-foreground border-primary font-black"
                role="button">Create meme
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        // className="grid grid-cols-1 md:grid-cols-2 gap-6"
        (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memes.map((meme, key) => (
            <Suspense key={key}>
              <Thumb
                meme={meme} memeCatalogueId={paramId}
              />
            </Suspense>
          ))}
        </div>)
      )}
    </div>
  </>)
}
