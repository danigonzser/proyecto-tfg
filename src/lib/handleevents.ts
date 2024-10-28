import { DeadRect } from "@/components/fabric-canvas"
import { Canvas, Point } from "fabric"


// zoom canvas on mouse scroll
export const handleCanvasZoom = (options: fabric.IEvent & { e: WheelEvent }, canvas: Canvas | undefined) => {

  if (!canvas) return

  var delta = options.e.deltaY
  var zoom = canvas.getZoom()

  const minZoom = 0.2
  const maxZoom = 4
  const zoomStep = 0.001

  zoom = Math.min(Math.max(minZoom, zoom - delta * zoomStep), maxZoom)

  const pointToZoom = new Point({ x: options.e.offsetX, y: options.e.offsetY })

  canvas.zoomToPoint(pointToZoom, zoom)
  options.e.preventDefault()
  options.e.stopPropagation()
}

export const handleZoomToCenter = (zoomIn: boolean, deadrect: DeadRect | undefined, canvas: Canvas | undefined) => {

  if (!canvas) return

  //if (!deadrect) return

  var zoom = canvas.getZoom()

  const minZoom = 0.2
  const maxZoom = 4

  if (zoomIn) {
    zoom = Math.min(Math.max(minZoom, zoom * 1.1), maxZoom)
  } else {
    zoom = Math.min(Math.max(minZoom, zoom / 1.1), maxZoom)
  }

  const pointToCenter = canvas.getCenterPoint()

  const pointToZoom = new Point({ x: pointToCenter.x, y: pointToCenter.y })

  canvas.zoomToPoint(pointToZoom, zoom)
}

export const handleCanvasZoomToPoint = (x: number, y: number, canvas: Canvas | undefined, scale: number) => {

  if (!canvas) return

  const zoom = canvas.getZoom() * scale

  const pointToZoom = new Point({ x: x, y: y })

  canvas.zoomToPoint(pointToZoom, zoom)
}