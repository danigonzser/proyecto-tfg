import { Canvas } from "fabric"

export function rescale_canvas_if_needed(canvas: Canvas | undefined) {
  if (canvas) {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width
    const height =
      window.innerHeight > 0 ? window.innerHeight : screen.height

    const aspect = canvas.width / canvas.height
    const imageWidth = width
    const imageHeight = width / aspect
    const canvasHeight = Math.max(height, imageHeight)
    canvas.width = (imageWidth)
    canvas.height = (canvasHeight)
  }

}