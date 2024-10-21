import { ModeToggle } from "@/components/mode-toggle-button"
import dynamic from "next/dynamic"

const FabricCanvasNoSSR = dynamic(
  () => import('@/components/fabric-canvas'),
  { ssr: false }
)

function HelloWord() {
  return (
    <div className="h-full w-full">
      <FabricCanvasNoSSR />
    </div>
  )
}

export default HelloWord