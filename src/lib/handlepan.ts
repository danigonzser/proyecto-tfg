import { Canvas, Point } from "fabric"


export const handlePan = (options: fabric.IEvent & { e: MouseEvent }, canvas: Canvas | undefined) => {

  if (!canvas) return

  const delta = new Point({ x: options.e.movementX, y: options.e.movementY })

  canvas.relativePan(delta)
  options.e.preventDefault()
  options.e.stopPropagation()

}