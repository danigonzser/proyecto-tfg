"use client"

import dynamic from "next/dynamic"

const FabricCanvasWithNoSSR = dynamic(
  () => import('../../components/fabric-canvas'),
  { ssr: false }
)

function HelloWord() {
  return (
    <div className="h-full w-full">
      <FabricCanvasWithNoSSR />
    </div>
  )
}

export default HelloWord