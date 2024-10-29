'use client'

import dynamic from 'next/dynamic'

const FabricCanvasWithNoSSR = dynamic(
  () => import('./fabric-canvas'),
  { ssr: false }
)

export default function EditMemeClient({ memeId }: { memeId: string }) {
  return (
    <div className="h-full w-full">
      <FabricCanvasWithNoSSR memeId={memeId} />
    </div>
  )
}