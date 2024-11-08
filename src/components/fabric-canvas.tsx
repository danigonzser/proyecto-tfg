"use client" // next.js app router

import React, { useState, useEffect, useRef, DragEvent, ChangeEvent } from "react"
import * as fabric from 'fabric'
import { Button } from "@/components/ui/button"
import { BoxSelect, CircleCheckBig, Cloud, Hand, House, ImagePlus, Megaphone, Minus, PaintBucket, PencilLine, RedoIcon, Square, Trash2, TypeIcon, TypeOutline, UndoIcon, ZoomIn, ZoomOut } from "lucide-react"
import { Separator } from "./ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HexColorPicker } from "react-colorful"
import { Slider } from "@/components/ui/slider"
import { Input } from "./ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { handleCanvasZoom, handleCanvasZoomToPoint, handleZoomToCenter } from "@/lib/handleevents"
import { Tools } from "@/lib/types"
import { FontSelect } from "./ui/fontselect"
import { ToggleStylesGroup } from "./ui/togglestyles"
import Link from "next/link"
import { DialogDrawer } from "./dialog-drawer"
import { initAligningGuidelines } from "@/lib/canvas_guideline"
import { initCenteringGuidelines } from "@/lib/canvas_center"
import { cn } from "@/lib/utils"
import { handlePan } from "@/lib/handlepan"
import { NewProjectForm } from "./new_project_form"
import { getMemeById } from "@/lib/getmemes"
import { setMemeByIdInCatalogue } from "@/lib/getcatalogues"
import { Manager } from "hammerjs"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "./ui/context-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useToast } from "@/hooks/use-toast"

export class DeadRect extends fabric.Rect {
  static get type() {
    return 'DeadRect'
  }
  constructor(options = {}) {
    super(options)
    // Any constructor stuff you want
    this.evented = false
    this.selectable = false
  }

  toDatalessObject(propertiesToInclude?: unknown[]) {
    return {
      ...super.toDatalessObject(propertiesToInclude),
      // any custom properties you wanna add
    }
  }
}

fabric.classRegistry.setClass(DeadRect)
fabric.classRegistry.setSVGClass(DeadRect)

export class DeadImage extends fabric.FabricImage {
  static get type() {
    return 'DeadImage'
  }

  constructor(elementId: string, options?: Partial<fabric.ImageProps> | undefined) {
    super(elementId, options)
    // Any constructor stuff you want
    this.evented = false
    this.selectable = false
  }

  toDatalessObject(propertiesToInclude?: unknown[]) {
    return {
      ...super.toDatalessObject(propertiesToInclude),
      // any custom properties you wanna add
    }
  }
}

fabric.classRegistry.setClass(DeadImage)
fabric.classRegistry.setSVGClass(DeadImage)

export function LoadingSpinner({ className }: { className?: string }) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )

}

function App({
  memeId
}: {
  memeId?: string
}) {

  const { toast, dismiss } = useToast()

  const press = useRef(false)

  const [canvas, setCanvas] = useState<fabric.Canvas>()

  const canvasRef = useRef<fabric.Canvas | undefined>(undefined)

  const [editableDeadRectArea, setEditableDeadRectArea] = useState<DeadRect>()

  const undoHistory = useRef<string[]>([])
  const redoHistory = useRef<string[]>([])
  const undoHistoryElementsRef = useRef(1)
  const redoHistoryElementsRef = useRef(0)

  const [undoHistoryElements, setUndoHistoryElements] = useState(1)
  const [redoHistoryElements, setRedoHistoryElements] = useState(0)

  const isLoadingFromHistory = useRef(false)

  const presetColors = ["#FFEA00", "#000000", "#ff0000", "#0000ff", "#008000"]

  const [color, setColor] = useState("#AAAAA")

  const [memeName, setMemeName] = useState('')

  function handleChangeColor(value: string, canvas: fabric.Canvas | undefined) {
    setColor(value)

    if (canvas !== undefined) {
      const selectedElement = canvas.getActiveObject()

      if (!selectedElement || selectedElement?.type === "activeSelection" || selectedElement?.type !== "path") return

      selectedElement.set("stroke", value)

      canvas.renderAll()

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(canvas.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)


      }
    }
  }

  useEffect(() => {
    if (canvas?.freeDrawingBrush !== undefined) {
      canvas.freeDrawingBrush.color = color
    }
  }, [color])

  const [rectColor, setRectColor] = useState("transparent")
  const rectColorRef = useRef("transparent")

  function handleChangeRectColor(value: string, canvas: fabric.Canvas | undefined) {
    setRectColor(value)
    rectColorRef.current = value

    if (canvas !== undefined) {
      const selectedElement = canvas.getActiveObject()

      if (!selectedElement || selectedElement?.type === "activeSelection" || selectedElement?.type !== "rect") return

      selectedElement.set("fill", value)

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(canvas.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)


      }

      canvas.renderAll()
    }
  }

  const [drawingWidth, setDrawingWidth] = useState([5])

  const [rectStrokeWidth, setRectStrokeWidth] = useState([2])
  const [rectStrokeColor, setRectStrokeColor] = useState("black")

  const rectStrokeWidthRef = useRef([2])
  const rectStrokeColorRef = useRef("black")

  function handleStrokeWidthChange(value: number, canvas: fabric.Canvas | undefined) {
    setRectStrokeWidth([value])
    rectStrokeWidthRef.current = [value]

    if (canvas !== undefined) {
      const selectedElement = canvas.getActiveObject()

      if (!selectedElement || selectedElement?.type === "activeSelection") return

      selectedElement.set("strokeWidth", value)

      selectedElement.setCoords()
      canvas.renderAll()
      canvas.requestRenderAll()

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(canvas.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)

      }

    } else {
      console.log("Canvas is undefined!")
    }

  }

  function handleStrokeColorChange(value: string, canvas: fabric.Canvas | undefined) {
    setRectStrokeColor(value)
    rectStrokeColorRef.current = value

    if (canvas !== undefined) {
      const selectedElement = canvas.getActiveObject()

      if (!selectedElement || selectedElement?.type === "activeSelection") return

      selectedElement.set("stroke", value)

      canvas.renderAll()

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(canvas.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)

      }
    }

  }

  useEffect(() => {
    if (canvas?.freeDrawingBrush !== undefined) {
      canvas.freeDrawingBrush.width = drawingWidth[0]
    }
  }, [drawingWidth])

  const isRecting = useRef(false)

  const rectFabricRef = useRef(false)

  const [fabricModeState, setFabricModeState] = useState<Tools>("selection")

  const drawingMode = useRef<Tools>("selection")

  const drawingShape = useRef<fabric.FabricObject | null>(null)

  const fontfamilyRef = useRef<string>("Arial")

  const [fontFamily, setFontFamily] = useState("Arial")

  function handleChangeFontFamily(value: string, canvas: fabric.Canvas | undefined) {
    setFontFamily(value)
    fontfamilyRef.current = value

    if (!isLoadingFromHistory.current && canvas !== undefined) {

      undoHistory.current.push(canvas.toJSON())

      undoHistoryElementsRef.current += 1
      setUndoHistoryElements(undoHistoryElementsRef.current)

    }
  }

  const fontSizeRef = useRef(20)

  const fontColorRef = useRef("#000000")

  const [fontColor, setFontColor] = useState("#000000")

  function handleChangeFontColor(value: string, canvas: fabric.Canvas | undefined) {
    setFontColor(value)
    fontColorRef.current = value

    if (canvas !== undefined) {
      const selectedElement = canvas.getActiveObject()

      if (!selectedElement || selectedElement?.type === "activeSelection") return

      selectedElement.set("fill", value)

      canvas.renderAll()

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(canvas.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)


      }
    }

  }

  const fontStyleRef = useRef<string[]>([])

  const [fontStyle, setfontStyle] = useState<string[]>([])

  function handleChangefontStyle(value: string[]) {
    setfontStyle(value)
    fontStyleRef.current = value

    if (canvas !== undefined) {
      const selectedElement = canvas.getActiveObject()

      if (!selectedElement || selectedElement?.type === "activeSelection") return

      if (value.includes("bold")) {
        selectedElement.set("fontWeight", "bold")
      } else if (selectedElement.get("fontWeight") === "bold" && !value.includes("bold")) {
        selectedElement.set("fontWeight", "normal")
      }

      if (value.includes("italic")) {
        selectedElement.set("fontStyle", "italic")
      } else if (selectedElement.get("fontStyle") === "italic" && !value.includes("italic")) {
        selectedElement.set("fontStyle", "normal")
      }

      if (value.includes("underline")) {
        selectedElement.set("underline", "true")
      } else if (selectedElement.get("underline") === "true" && !value.includes("underline")) {
        selectedElement.set("underline", false)
      }

      canvas.renderAll()

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(canvas.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)


      }
    }
  }

  const x = useRef(0)
  const y = useRef(0)

  const canvasWidth = useRef(1000)

  const canvasHeight = useRef(1000)

  const canvasEditableAreaWidth = useRef(0)

  const canvasEditableAreaHeight = useRef(0)

  const bgColorEditableArea = useRef("#FFFFFF")

  const originalImageWidth = useRef(0)

  const originalImageHeight = useRef(0)

  function handleCanvasSize(width: number, height: number) {

    originalImageWidth.current = width
    originalImageHeight.current = height

    // 1600 x 1200 pixels, but only has space for x pixels
    // (original height / original width) x new width = new height

    // Calculate the max width of the canvas

    const element = document.getElementById('height-canvas')

    if (element !== null) {

      const maxWidth = element.offsetWidth

      const newWidth = Math.min(maxWidth, width)

      const newHeight = Math.round((height / width) * newWidth)

      console.log("Tamaños:", newWidth, newHeight, maxWidth, width, (height / width) * newWidth)

      if (canvas !== undefined && editableDeadRectArea !== undefined) {

        // Canvas
        canvas.width = element.offsetWidth
        canvas.height = element.offsetHeight

        canvasWidth.current = element.offsetWidth
        canvasHeight.current = element.offsetHeight

        // Editable Area
        editableDeadRectArea.width = newWidth
        editableDeadRectArea.height = newHeight

        canvasEditableAreaWidth.current = newWidth
        canvasEditableAreaHeight.current = newHeight

        canvas.centerObject(editableDeadRectArea)

        if (element.offsetHeight < newHeight) {
          const neededZoom = (element.offsetHeight / newHeight) - 0.1

          const pointToZoom = new fabric.Point({ x: editableDeadRectArea.getCenterPoint().x, y: editableDeadRectArea.getCenterPoint().y })

          canvas.zoomToPoint(pointToZoom, neededZoom)

        }

        canvas.renderAll()

      }

    }

  }

  function handlebgColorEditableArea(value: string) {

    bgColorEditableArea.current = value

    if (editableDeadRectArea !== undefined && canvas !== undefined) {
      editableDeadRectArea.fill = value
      canvas.renderAll()

      initCanvasFromBlank.current = true
      handleInitHistory(canvas)
      initCanvasFromBlank.current = false
    }

  }

  const initialStateSaved = useRef(false)
  const initCanvasFromBlank = useRef(false)

  function handleInitHistory(c: fabric.Canvas) {

    if (!initialStateSaved.current) {

      undoHistory.current = []
      redoHistory.current = []
      undoHistory.current.push(c.toJSON())

      setUndoHistoryElements(1)
      undoHistoryElementsRef.current = 1
      setRedoHistoryElements(0)
      redoHistoryElementsRef.current = 0

      initialStateSaved.current = true

    } else if (initCanvasFromBlank.current) {

      undoHistory.current = []
      redoHistory.current = []
      undoHistory.current.push(c.toJSON())

      setUndoHistoryElements(1)
      undoHistoryElementsRef.current = 1
      setRedoHistoryElements(0)
      redoHistoryElementsRef.current = 0

    }
  }

  const [loading, setLoading] = useState(memeId !== undefined ? true : false)

  const xPanRef = useRef(0)
  const yPanRef = useRef(0)

  const pinchRef = useRef(1)

  const modificationsSavedRef = useRef(true)
  const [modificationsSavedState, setModificationsSavedState] = useState(true)

  function handleModificationSaved(value: boolean) {
    modificationsSavedRef.current = value
    setModificationsSavedState(value)
  }

  const loadingFromJsonIdRef = useRef<boolean>(false)

  function handleLoadingFromJsonId(value: boolean) {
    loadingFromJsonIdRef.current = value
  }

  const loadingToastRef = useRef<string | null>(null)

  useEffect(() => {

    const element = document.getElementById('height-canvas')

    if (!element) return

    const c = new fabric.Canvas("canvas", {
      height: element.offsetHeight, // 884 // MAX: 800
      width: element.offsetWidth, // 1840 // MAX: 1600
      backgroundColor: "#292524", // #292524
    })

    fabric.InteractiveFabricObject.ownDefaults.controls = {
      ...fabric.controlsUtils.createObjectDefaultControls(),
      deleteControl: new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetX: 16,
        offsetY: -16,
        cursorStyle: 'pointer',
        mouseUpHandler: () => {
          handleObjectRemove(c)
        },
        render: (ctx, left, top) => {
          const size = 24 // Tamaño del botón
          ctx.save()
          ctx.translate(left, top)

          // Dibujar el círculo rojo
          ctx.beginPath()
          ctx.arc(0, 0, size / 2, 0, 2 * Math.PI)
          ctx.fillStyle = 'red'
          ctx.fill()
          ctx.strokeStyle = 'white'
          ctx.lineWidth = 2
          ctx.stroke()

          // Dibujar la "X" blanca
          ctx.beginPath()
          ctx.moveTo(-size / 4, -size / 4)
          ctx.lineTo(size / 4, size / 4)
          ctx.moveTo(size / 4, -size / 4)
          ctx.lineTo(-size / 4, size / 4)
          ctx.strokeStyle = 'white'
          ctx.lineWidth = 2
          ctx.stroke()

          ctx.restore()
        },
      }),
    }

    const hammer = new Manager(c.upperCanvasEl)

    const pan = new Hammer.Pan()
    const pinch = new Hammer.Pinch()

    hammer.add([pan, pinch])

    hammer.on('pinch', e => {

      const { center, scale } = e

      handleCanvasZoomToPoint(center.x, center.y, c, scale / pinchRef.current)

      pinchRef.current = scale

    })

    hammer.on('pinchend', () => {
      pinchRef.current = 1
    })

    hammer.on('panstart', function (ev) {
      xPanRef.current = ev.center.x
      yPanRef.current = ev.center.y
    })

    hammer.on('panmove', function (ev) {

      if (drawingMode.current === "drag") {
        const delta = new fabric.Point({ x: ev.center.x - xPanRef.current, y: ev.center.y - yPanRef.current })

        c.relativePan(delta)
        c.renderAll()
        xPanRef.current = ev.center.x
        yPanRef.current = ev.center.y

      }

    })

    if (memeId === undefined) {

      const deadRect = new DeadRect({
        width: canvasEditableAreaWidth.current,
        height: canvasEditableAreaHeight.current,
        fill: bgColorEditableArea.current,
        strokeWidth: 0,
      })

      deadRect.shadow = new fabric.Shadow({
        color: 'rgb(255,255,224,0.5)',
        blur: 50,
        offsetX: 10,
        offsetY: 10
      })

      c.add(deadRect)
      c.centerObject(deadRect)
      setEditableDeadRectArea(deadRect)

      handleInitHistory(c)
      handleLoadingFromJsonId(false)

    } else {

      handleLoadingFromJsonId(true)

      if (loading) {
        loadingToastRef.current = toast({
          title: "Loading meme",
          action: <LoadingSpinner />
        }).id
      }

      getMemeById(memeId).then((meme) => {

        setMemeName(meme.title)

        console.log(meme.imageJson)

        c.loadFromJSON(meme.imageJson, function (o, object) {

          const ob = object as fabric.Object

          if (ob.type === "deadrect") {

            setEditableDeadRectArea(ob as DeadRect)

            handleCanvasSize(ob.width, ob.height)

            c.requestRenderAll()

          }
          c.add(ob)

        }).then((canvas) => {

          c.getObjects().forEach((object) => {

            if (object.type === "deadrect") {
              if (c.height < object.height) {
                const neededZoom = (c.height / object.height) - 0.1
                const pointToZoom = new fabric.Point({ x: c.getCenterPoint().x, y: c.getCenterPoint().y })
                c.zoomToPoint(pointToZoom, neededZoom)
              }
            }
          })

          handleInitHistory(c)
          canvas.requestRenderAll()
          handleModificationSaved(true)

        })

      }).finally(() => {

        if (loadingToastRef.current) dismiss(loadingToastRef.current)
        toast({
          title: "Loaded meme",
          action: <CircleCheckBig />,
          duration: 2000,
        })
        handleLoadingFromJsonId(false)
        setLoading(false)
        setPreparingProject(false)

      })
    }

    initAligningGuidelines(c)
    initCenteringGuidelines(c)

    c.on('object:added', function (opt) {

      if (typeof window !== 'undefined') {
        if (window.onbeforeunload !== null) {
          window.onbeforeunload = function () {
            return "Any progress not saved will be lost."
          }
        }
      }

      handleModificationSaved(false)

      if (!isLoadingFromHistory.current && opt.target.type !== "rect") {

        undoHistory.current.push(c.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)

      }
    })

    c.on('object:modified', function () {

      if (typeof window !== 'undefined') {
        if (window.onbeforeunload !== null) {
          window.onbeforeunload = function () {
            return "Any progress not saved will be lost."
          }
        }
      }

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(c.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)

      }
    })

    c.on('object:removed', function () {

      if (typeof window !== 'undefined') {
        if (window.onbeforeunload !== null) {
          window.onbeforeunload = function () {
            return "Any progress not saved will be lost."
          }
        }
      }

      if (!isLoadingFromHistory.current) {

        undoHistory.current.push(c.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)

      }
    })

    c.on('mouse:wheel', function (opt) {
      handleCanvasZoom(opt as fabric.TEvent<Event> & { e: WheelEvent }, c)
    })

    c.on('mouse:down', function (opt) {

      const pointer = c.getScenePoint(opt.e)
      const target = c.findTarget(opt.e)

      if (target === undefined) {

        if (drawingMode.current === "rect") {

          isRecting.current = true

          x.current = pointer.x
          y.current = pointer.y

          const rect = new fabric.Rect({
            left: x.current,
            top: y.current,
            fill: rectColorRef.current,
            stroke: rectStrokeColorRef.current,
            strokeWidth: rectStrokeWidthRef.current[0],
          })

          c.add(rect)
          c.renderAll()

          drawingShape.current = rect

        } else if (drawingMode.current === "type") {

          const text = new fabric.IText("Hello World", {
            left: pointer.x,
            top: pointer.y,
            fill: fontColorRef.current,
            fontFamily: fontfamilyRef.current,
            fontSize: fontSizeRef.current
          })

          c.add(text)
          c.renderAll()
          c.setActiveObject(text)

          drawingShape.current = text
        }

      }

      if (opt.e.altKey) {
        press.current = true
        c.selection = false
        c.setCursor('grabbing')
        c.renderAll()
      }
    })

    c.on('mouse:move', function (opt) {

      const pointer = c.getScenePoint(opt.e)

      if (drawingMode.current === "rect" && isRecting.current) {

        if (x.current > pointer.x) {
          drawingShape.current?.set({ left: Math.abs(pointer.x) })
        }
        if (y.current > pointer.y) {
          drawingShape.current?.set({ top: Math.abs(pointer.y) })
        }

        drawingShape.current?.set({ width: Math.abs(x.current - pointer.x) })
        drawingShape.current?.set({ height: Math.abs(y.current - pointer.y) })

        c.renderAll()
      }

      if (press.current && opt.e.altKey) {
        handlePan(opt as fabric.TEvent<Event> & { e: MouseEvent }, c)
      }

    })

    c.on('mouse:up', function () {

      if (!isLoadingFromHistory.current && drawingShape.current) {

        undoHistory.current.push(c.toJSON())

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)

      }

      drawingShape.current = null
      isRecting.current = false
      press.current = false
      c.selection = true
      c.setCursor('default')
      c.renderAll()
    })

    c.on('selection:updated', function (opt) {
      const target = opt.selected

      if (target !== undefined) {
        switch (target[0].type) {
          case "i-text":
            handleToolChange("type")
            break
          case "rect":
            handleStrokeColorChange(target[0].get("stroke"), c)
            handleStrokeWidthChange(target[0].get("strokeWidth"), c)
            handleToolChange("rect")
            break
          default:
            handleToolChange("freedraw")
            break
        }
      }
    })

    c.on('selection:created', function (opt) {

      const target = opt.selected

      if (target !== undefined) {

        switch (target[0].type) {
          case "i-text":
            handleToolChange("type")
            break
          case "rect":
            handleToolChange("rect")
            break
          case "path":
            handleToolChange("freedraw")

            break
          default:
            handleToolChange("freedraw")
            break
        }
      }
    })

    setCanvas(c)
    canvasRef.current = c
    c.requestRenderAll()

    if (typeof window !== 'undefined') {

      //Uncomment this with strict mode off
      window.addEventListener("keydown", (e) => {

        if (e.code === "Delete" || e.code === "Backspace") {
          handleObjectRemove(c)
        }


      })

      window.addEventListener("keypress", (e) => {
        if (e.ctrlKey && e.key === "z" && undoHistoryElementsRef.current > 1) {
          const element = document.getElementById('undo_canvas_button')
          if (element) element.click()
        }

        if (e.ctrlKey && e.key === "y" && redoHistoryElementsRef.current >= 1) {
          const element = document.getElementById('redo_canvas_button')
          if (element) element.click()
        }

      })

    }

    return () => {
      c.dispose()
      if (typeof window !== 'undefined') {
        window.onbeforeunload = null
      }
      handleModificationSaved(true)
    }
  }, [])

  const [syncing, setSyncing] = useState(false)

  useEffect(() => {

    const interval = setInterval(() => {

      if (memeId !== undefined && canvasRef.current !== undefined) {


        if (!syncing && (undoHistoryElementsRef.current > 1 || redoHistoryElementsRef.current >= 1)) {

          setSyncing(true)

          canvasRef.current.renderAll()

          const memeJson = canvasRef.current.toJSON()

          setMemeByIdInCatalogue(memeId, JSON.stringify(memeJson)).then(() => {
            setSyncing(false)
            toast({
              title: "Meme automatically saved!",
              description: "This occurs every minute",
              action: <Cloud />
            })
            if (typeof window !== 'undefined') {
              window.onbeforeunload = null
            }
            handleModificationSaved(true)

          })
        }

      } else if (undoHistoryElementsRef.current === 1 && memeId !== undefined) {

        toast({
          title: "Do changes in your meme and it will be automatically saved every minute!",
          action: <Cloud className="fill-primary" />,
          duration: 4000,
          variant: "success"
        })

      } else if (undoHistoryElementsRef.current === 1 && memeId === undefined) {

        toast({
          title: "Do changes in your meme and save it to a catalogue!",
          action: <Cloud className="fill-primary" />,
          duration: 4000,
          variant: "success"
        })

      }

    }, 300000) // 300000

    return () => clearInterval(interval)
  }, [])

  const handleToolChange = (value: Tools) => {

    switch (value) {
      case "selection":
        setIsToolbarExpanded(false)
        if (canvas !== undefined) {
          canvas.setCursor('default')

          canvas.isDrawingMode = false
          canvas.selection = true
        }
        drawingMode.current = "selection"
        setFabricModeState("selection")

        break
      case "freedraw":
        setIsToolbarExpanded(true)

        if (canvas !== undefined) {
          canvas.setCursor('default')

          const brush = new fabric.PencilBrush(canvas)
          canvas.freeDrawingBrush = brush
          canvas.freeDrawingBrush.color = color
          canvas.freeDrawingBrush.width = drawingWidth[0]
          canvas.isDrawingMode = true
        }
        drawingMode.current = "freedraw"
        setFabricModeState("freedraw")
        break
      case "rect":
        setIsToolbarExpanded(true)
        if (canvas !== undefined) {
          canvas.setCursor('default')
          canvas.isDrawingMode = false
        }
        drawingMode.current = "rect"
        setFabricModeState("rect")
        rectFabricRef.current = true
        break
      case "type":
        setIsToolbarExpanded(true)
        if (canvas !== undefined) {
          canvas.setCursor('default')
          canvas.isDrawingMode = false
        }
        drawingMode.current = "type"
        setFabricModeState("type")
        break
      case "drag":
        setIsToolbarExpanded(false)
        if (canvas !== undefined) {
          canvas.isDrawingMode = false
          canvas.selection = false
          canvas.renderAll()
        }
        drawingMode.current = "drag"
        setFabricModeState("drag")
        break
    }
  }

  const handleUndo = () => {

    if (undoHistory.current.length <= 1) return

    if (canvas !== undefined) {
      const last = undoHistory.current.pop()

      undoHistoryElementsRef.current -= 1
      setUndoHistoryElements(undoHistoryElementsRef.current)

      isLoadingFromHistory.current = true

      const stateToLoad = undoHistory.current[undoHistory.current.length - 1]

      if (stateToLoad !== undefined) {

        canvas.loadFromJSON(JSON.stringify(stateToLoad)).then(() => {
          canvas.renderAll()
          isLoadingFromHistory.current = false
        })

      }

      if (last !== undefined) {

        redoHistory.current.push(last)

        redoHistoryElementsRef.current += 1
        setRedoHistoryElements(redoHistoryElementsRef.current)

      }

    }

  }

  const handleRedo = () => {

    if (redoHistory.current.length === 0) return

    if (canvas !== undefined) {

      const last = redoHistory.current.pop()

      redoHistoryElementsRef.current -= 1
      setRedoHistoryElements(redoHistoryElementsRef.current)

      if (last !== undefined) {

        undoHistory.current.push(last)

        undoHistoryElementsRef.current += 1
        setUndoHistoryElements(undoHistoryElementsRef.current)

        isLoadingFromHistory.current = true

        canvas.loadFromJSON(last, function () {
        }).then((canvas) => {
          canvas.renderAll()
          isLoadingFromHistory.current = false
        })

      }

    }

  }

  function handleCanvasClear() {

    if (canvas !== undefined) {
      const objects = canvas.getObjects()

      objects.forEach(function (object) {

        if (object.type !== "deadrect") {
          canvas.remove(object)
        }

      })

      initCanvasFromBlank.current = true
      handleInitHistory(canvas)
      initCanvasFromBlank.current = false
    }

  }

  const handleObjectRemove = (canvas: fabric.Canvas | undefined) => {
    if (canvas !== undefined) {

      const objects = canvas.getActiveObjects()

      if (objects !== undefined) {

        objects.forEach(function (object) {

          if (object.type === "i-text") {
            const text = object as fabric.IText
            if (!text.isEditing) {
              canvas.remove(object)
            }
          } else {
            canvas.remove(object)
            canvas.discardActiveObject()
          }

        })

      }

      canvas.renderAll()
    }
  }

  const handleMemeUpload = (canvas: fabric.Canvas | undefined, memeId: string | undefined) => {

    if (!syncing && memeId !== undefined && canvas !== undefined && undoHistoryElementsRef.current > 1) {

      setSyncing(true)

      canvas.renderAll()

      const memeJson = canvas.toJSON()

      setMemeByIdInCatalogue(memeId, JSON.stringify(memeJson)).then(() => {

        setSyncing(false)
        toast({
          title: "Meme manually saved!",
          description: "Just in case, it happens every minute 😉",
          action: <Cloud />
        })
        if (typeof window !== 'undefined') {
          window.onbeforeunload = null
        }
        handleModificationSaved(true)
      })

    } else if (!syncing && canvas !== undefined && memeId !== undefined && undoHistoryElementsRef.current === 1) {

      toast({
        title: "Nothing to save!",
        description: "Start by editing your meme",
        action: <Cloud />
      })

    } else if (memeId === undefined) {
      toast({
        title: "Save your meme to a catalogue first!",
        action: <Megaphone />
      })

      if (typeof document !== 'undefined') {

        document.getElementById('save_as_dialog')?.focus()
        setTimeout(() => document.getElementById('save_as_dialog')?.blur(), 500)
        setTimeout(() => document.getElementById('save_as_dialog')?.focus(), 1000)
        setTimeout(() => document.getElementById('save_as_dialog')?.blur(), 1500)

        document.getElementById('save_as_drawer')?.focus()
        setTimeout(() => document.getElementById('save_as_drawer')?.blur(), 500)
        setTimeout(() => document.getElementById('save_as_drawer')?.focus(), 1000)
        setTimeout(() => document.getElementById('save_as_drawer')?.blur(), 1500)

      }

    }

  }

  const handleMemeSave = (location: "local" | "catalogue", memeSaveName: string, memeFormat: fabric.ImageFormat) => {

    if (canvas === undefined) {
      console.log("Canvas is undefined!")
    }

    console.log("llego")

    if (canvas !== undefined && editableDeadRectArea !== undefined) {

      console.log("Llego1")

      const preZoom = canvas.getZoom()
      const prePan = canvas.viewportTransform

      canvas.setZoom(1)
      canvas.absolutePan(new fabric.Point({ x: 0, y: 0 }))
      canvas.renderAll()


      if (editableDeadRectArea.width !== originalImageWidth.current && editableDeadRectArea.height !== originalImageHeight.current) {

        console.log("Llego2")

        const scaleMultiplier = originalImageWidth.current / editableDeadRectArea.width

        const objects = canvas.getObjects()

        objects.forEach(function (object) {

          object.scaleX = object.scaleX * scaleMultiplier
          object.scaleY = object.scaleY * scaleMultiplier
          object.left = object.left * scaleMultiplier
          object.top = object.top * scaleMultiplier

          object.setCoords()

        })

        canvas.renderAll()
      }

      console.log("Llego3")

      const data = canvas.toDataURL({
        left: editableDeadRectArea.left,
        top: editableDeadRectArea.top,
        enableRetinaScaling: true,
        format: memeFormat,
        height: originalImageHeight.current,
        width: originalImageWidth.current,
        multiplier: 1,
      })

      canvas.setZoom(preZoom)
      canvas.viewportTransform = prePan

      const link = document.createElement('a')
      link.download = memeSaveName
      link.href = data
      link.click()
      link.remove()

      if (editableDeadRectArea.width !== originalImageWidth.current && editableDeadRectArea.height !== originalImageHeight.current) {

        console.log("Llego4")

        const scaleMultiplier = originalImageWidth.current / editableDeadRectArea.width

        const objects = canvas.getObjects()

        objects.forEach(function (object) {

          object.scaleX = object.scaleX / scaleMultiplier
          object.scaleY = object.scaleY / scaleMultiplier
          object.left = object.left / scaleMultiplier
          object.top = object.top / scaleMultiplier

          object.setCoords()

        })

        canvas.centerObject(editableDeadRectArea)
        canvas.renderAll()
      }
    }
  }

  const [isDragging, setIsDragging] = useState(false)

  function handleDragOver(event: DragEvent): void {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeaveEvent(event: DragEvent): void {
    event.preventDefault()
    setIsDragging(false)
  }

  function handleDropEvent(event: DragEvent): void {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            handleAddMeme(e.target.result.toString()).then(() => {
              setIsDragging(false)
            })
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  async function handleAddMeme(data: string) {
    const imageToAdd = await fabric.FabricImage.fromURL(data)

    if (canvas !== undefined) {
      canvas.add(imageToAdd)
    }
  }

  const [preparingProject, setPreparingProject] = useState(true)

  async function handleSetMeme(data: string) {

    if (canvas !== undefined && editableDeadRectArea !== undefined) {

      const imageToSet = await DeadImage.fromURL(data)

      handleCanvasSize(imageToSet.width, imageToSet.height)

      if (!(imageToSet.width === editableDeadRectArea.width && imageToSet.height === editableDeadRectArea.height)) {

        imageToSet.scaleToWidth(editableDeadRectArea.width)
        imageToSet.scaleToHeight(editableDeadRectArea.height)
      }

      imageToSet.evented = false
      imageToSet.selectable = false
      imageToSet.strokeWidth = 0

      canvas.add(imageToSet)
      canvas.centerObject(imageToSet)
      canvas.renderAll()

      initCanvasFromBlank.current = true
      handleInitHistory(canvas)
      initCanvasFromBlank.current = false

    }

  }

  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      handleAddMeme(imageUrl).then(() => {
        canvas?.renderAll()
      })
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-background overflow-hidden">
      <TooltipProvider delayDuration={0}>
        <aside className="hidden md:flex bg-background flex-none flex-col items-center gap-2 px-2 py-4 justify-between">
          <div className="flex flex-col items-center">
            <ToggleGroup
              type="single"
              className="flex flex-col ToggleGroup"
              value={fabricModeState}
              onValueChange={(value: typeof fabricModeState) => {
                handleToolChange(value)
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="drag" className="ToggleGroupItem w-12 h-12" data-cy="drag_tool">
                    <Hand className="w-6 h-6" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Drag</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="selection" className="ToggleGroupItem w-14 h-14" data-cy="selection_tool">
                    <BoxSelect className="w-7 h-7" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Selection</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="rect" className="ToggleGroupItem w-14 h-14" data-cy="rect_tool">
                    <Square className="w-7 h-7" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Rect</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="freedraw" className="ToggleGroupItem w-14 h-14" data-cy="freedraw_tool">
                    <PencilLine className="w-7 h-7" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Freedraw</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="type" className="ToggleGroupItem w-14 h-14" data-cy="type_tool">
                    <TypeIcon className="w-7 h-7" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Type</p>
                </TooltipContent>
              </Tooltip>

            </ToggleGroup>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-14 h-14" onClick={handleCanvasClear} data-cy="clear_all_button">
                  <Trash2 className="w-7 h-7" />
                  <span className="sr-only">Clear canvas</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Clear all</p>
              </TooltipContent>
            </Tooltip>

            <Separator orientation="horizontal" className="w-12 my-2" />

            <Button
              data-cy="insert_image_button"
              variant="ghost"
              size="icon"
              className="w-14 h-14"
              onClick={() => document.getElementById('imageInput')?.click()}
            >
              <ImagePlus className="w-7 h-7" />
            </Button>

            {!preparingProject && (
              <DialogDrawer preparedProject={preparingProject} canvasFabric={canvas} memeName={memeName} setMemeName={setMemeName} memeDownload={handleMemeSave} />
            )}
          </div>
          <div className="flex flex-col items-center gap-2">

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" data-cy="home_button">
                  <Button variant="ghost" size="icon" className="w-14 h-14">
                    <House className="h-7 w-7" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Go home</p>
              </TooltipContent>
            </Tooltip>

          </div>
        </aside>

        <main className="h-full flex flex-col md:flex-grow">
          <div className="flex justify-between items-center p-4 border-b md:border-none md:hidden">
            <div className="md:hidden flex items-center">
              {syncing ? (

                <Tooltip>
                  <TooltipTrigger asChild>
                    <LoadingSpinner />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Syncing...</p>
                  </TooltipContent>
                </Tooltip>

              ) : (

                <Tooltip>
                  {modificationsSavedState ? (

                    <TooltipTrigger asChild>
                      <Button variant="ghost" onClick={() => handleMemeUpload(canvas, memeId)} className="w-full h-full px-1" data-cy="sync_button_mobile">
                        <Cloud aria-label="Sync with cloud" />
                      </Button>
                    </TooltipTrigger>

                  ) : (

                    <TooltipTrigger asChild>
                      <span className="h-full relative inline-flex items-center">
                        <Button size="icon" variant="ghost" onClick={() => handleMemeUpload(canvas, memeId)} className="w-full h-full px-1" data-cy="edited_sync_button_mobile">
                          <Cloud aria-label="Sync with cloud" />
                        </Button>
                        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 mr-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary/90"></span>
                        </span>
                      </span>
                    </TooltipTrigger>

                  )}

                  <TooltipContent side="bottom">
                    <p>Sync with cloud</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <input
                  className="fit-auto text-xl bg-input w-full md:w-auto text-center rounded mx-2"
                  value={memeName}
                  onChange={(e) => setMemeName(e.target.value)}
                  data-cy="meme_name_input_mobile"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Meme name</p>
              </TooltipContent>
            </Tooltip>

            <div className="flex space-x-2 md:hidden">

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" onClick={() => handleZoomToCenter(true, editableDeadRectArea, canvas)}>
                    <ZoomIn className="h-4 w-4" data-cy="zoom_in_button_mobile" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Zoom in</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" onClick={() => handleZoomToCenter(false, editableDeadRectArea, canvas)} data-cy="zoom_out_button_mobile">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Zoom out</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleUndo} size="icon" disabled={undoHistoryElements <= 1} id="undo_canvas_button" data-cy="undo_button_mobile">
                    <UndoIcon className="w-4 h-4" />
                    <span className="sr-only">Undo</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Undo action</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleRedo} disabled={redoHistoryElements === 0} id="redo_canvas_button" data-cy="redo_button_mobile">
                    <RedoIcon className="w-4 h-4" />
                    <span className="sr-only">Redo</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Redo action</p>
                </TooltipContent>
              </Tooltip>


            </div>
          </div>

          <div className="hidden md:flex flex-wrap gap-4 items-center w-full justify-center p-4">

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={handleUndo} className="w-14 h-14" disabled={undoHistoryElements <= 1} data-cy="undo_button">
                  <UndoIcon className="w-7 h-7" />
                  <span className="sr-only">Undo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Undo action</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={handleRedo} className="w-14 h-14" disabled={redoHistoryElements === 0} data-cy="redo_button">
                  <RedoIcon className="w-7 h-7" />
                  <span className="sr-only">Redo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Redo action</p>
              </TooltipContent>
            </Tooltip>


            <Separator orientation="vertical" className="h-12 hidden md:block" />
            {syncing ? (

              <Tooltip>
                <TooltipTrigger asChild>
                  <LoadingSpinner />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Syncing...</p>
                </TooltipContent>
              </Tooltip>

            ) : (

              <Tooltip>
                {modificationsSavedState ? (

                  <TooltipTrigger asChild>
                    <Button variant="ghost" onClick={() => handleMemeUpload(canvas, memeId)} className="w-14 h-14" data-cy="sync_button">
                      <Cloud aria-label="Sync with cloud" />
                    </Button>
                  </TooltipTrigger>

                ) : (

                  <TooltipTrigger asChild>
                    <span className="relative inline-flex">
                      <Button variant="ghost" onClick={() => handleMemeUpload(canvas, memeId)} className="w-14 h-14" data-cy="edited_sync_button">
                        <Cloud aria-label="Sync with cloud" />
                      </Button>
                      <span className="flex absolute h-3 w-3 top-0 right-0 mt-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary/90"></span>
                      </span>
                    </span>
                  </TooltipTrigger>

                )}

                <TooltipContent side="bottom">
                  <p>Sync with cloud</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <input
                  className="fit-auto text-xl bg-input w-full md:w-auto text-center rounded mx-2"
                  value={memeName}
                  onChange={(e) => setMemeName(e.target.value)}
                  data-cy="meme_name_input"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Input for meme name</p>
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-12 hidden md:block" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => handleZoomToCenter(true, editableDeadRectArea, canvas)} className="w-14 h-14" data-cy="zoom_in_button">
                  <ZoomIn className="w-7 h-7" />
                  <span className="sr-only">Zoom In</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Zoom in</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => handleZoomToCenter(false, editableDeadRectArea, canvas)} className="w-14 h-14" data-cy="zoom_out_button">
                  <ZoomOut className="w-7 h-7" />
                  <span className="sr-only">Zoom Out</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Zoom out</p>
              </TooltipContent>
            </Tooltip>

            {drawingMode.current === "rect" && (
              <>
                <Separator orientation="vertical" className="h-12 hidden md:block" />
                <Popover>
                  <PopoverTrigger data-cy="rectcolor_paint"><PaintBucket className="w-7 h-7 mx-2" fill={rectColor} /></PopoverTrigger>
                  <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                    <HexColorPicker color={rectColor} onChange={(value) => handleChangeRectColor(value, canvas)} />
                    <div className="flex flex-col gap-2 rounded p-2">
                      {presetColors.map((presetColor) => (
                        <Button
                          data-cy={`rectcolor-${presetColor}`}
                          key={`rect-${presetColor}`}
                          id={`rect-${presetColor}`}
                          className="w-10 h-10"
                          style={{ background: presetColor }}
                          onClick={() => handleChangeRectColor(presetColor, canvas)}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Separator orientation="vertical" className="h-12 hidden md:block" />
                <Slider value={rectStrokeWidth} max={100} step={1} onValueChange={(i) => handleStrokeWidthChange(i[0], canvas)} className="w-56" data-cy="rectstroke_width_slider" />
                <Input type="number" onChange={(e) => handleStrokeWidthChange(parseInt(e.target.value), canvas)} value={rectStrokeWidth[0]} width={5} className="w-20" data-cy="rectstroke_width_input" />
                <Popover>
                  <PopoverTrigger data-cy="rectstroke_color_button">
                    <Minus className="w-7 h-7" id="rectstrokecolor" strokeWidth={10} /></PopoverTrigger>
                  <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                    <HexColorPicker color={rectStrokeColor} onChange={(value) => handleStrokeColorChange(value, canvas)} />
                    <div className="flex flex-col gap-2 rounded p-2">
                      {presetColors.map((presetColor) => (
                        <Button
                          key={`rectstroke-${presetColor}`}
                          id={`rectstroke-${presetColor}`}
                          data-cy={`rectstroke-${presetColor}`}
                          className="w-10 h-10"
                          style={{ background: presetColor }}
                          onClick={() => handleStrokeColorChange(presetColor, canvas)}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}
            {drawingMode.current === "freedraw" && (
              <>
                <Separator orientation="vertical" className="h-12 hidden md:block" />
                <Popover>
                  <PopoverTrigger data-cy="freedrawcolor_paint"><PaintBucket fill={color} className="w-7 h-7" id="freedrawcolor" /></PopoverTrigger>
                  <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                    <HexColorPicker color={color} onChange={(value) => handleChangeColor(value, canvas)} />
                    <div className="flex flex-col gap-2 rounded p-2">
                      {presetColors.map((presetColor) => (
                        <Button
                          key={presetColor}
                          id={`freedraw-${presetColor}`}
                          data-cy={`freedraw-${presetColor}`}
                          className="w-10 h-10"
                          style={{ background: presetColor }}
                          onClick={() => handleChangeColor(presetColor, canvas)}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Slider value={drawingWidth} max={100} step={1} onValueChange={(i) => setDrawingWidth(i)} className="w-56" data-cy="freedraw_width_slider" />
                <Input type="number" onChange={(e) => setDrawingWidth([parseInt(e.target.value)])} value={drawingWidth[0]} width={5} className="w-20" data-cy="freedraw_width_input" />
              </>
            )}
            {drawingMode.current === "type" && (
              <>
                <FontSelect canvas={canvas} value={fontFamily} onValueChange={(value) => handleChangeFontFamily(value, canvas)} data-cy="font_type_select" />
                <Popover>
                  <PopoverTrigger data-cy="fontcolor_paint_button"><TypeOutline className="w-5 h-5" fill={fontColor} /></PopoverTrigger>
                  <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                    <HexColorPicker color={fontColor} onChange={(value) => handleChangeFontColor(value, canvas)} />
                    <div className="flex flex-col gap-2 rounded p-2">
                      {presetColors.map((presetColor) => (
                        <Button
                          key={presetColor}
                          data-cy={`type-${presetColor}`}
                          className="w-10 h-10"
                          style={{ background: presetColor }}
                          onClick={() => handleChangeFontColor(presetColor, canvas)}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <ToggleStylesGroup platform="" value={fontStyle} onValueChange={handleChangefontStyle} />
              </>
            )}
          </div>

          {preparingProject && (
            <NewProjectForm
              setPreparingProject={setPreparingProject}
              handleCanvasSize={handleCanvasSize}
              handlebgColorEditableArea={handlebgColorEditableArea}
              handleSetMeme={handleSetMeme}
            />
          )}

          <ContextMenu>
            <ContextMenuTrigger disabled>
              <div
                id="fabric-canvas-div"
                className={cn(
                  "h-full relative w-full overflow-hidden flex-1 flex justify-center items-center md:rounded-tl-3xl bg-secondary",
                  { "border-white blur-sm border-2 border-dashed": isDragging },
                  { "hidden": preparingProject }
                )}
                onDragOver={handleDragOver}
                onDrop={handleDropEvent}
                onDragLeave={handleDragLeaveEvent}
              >
                <canvas id="canvas" />
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem inset onClick={handleUndo} disabled={undoHistoryElements <= 1}>
                Back
                <ContextMenuShortcut className="font-mono">Ctrl+z</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset onClick={handleRedo} className="disabled:font-black" disabled={redoHistoryElements === 0} >
                Forward
                <ContextMenuShortcut className="font-mono">Ctrl+y</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset onClick={() => location.reload()}>
                Reload
                <ContextMenuShortcut className="font-mono">Ctrl+r</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset onClick={() => { document.getElementById("save_as_dialog")?.click() }}>
                Save as...
                <ContextMenuShortcut className="font-mono">Ctrl+s</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

          <div className={`rounded-t-lg flex flex-col fixed bottom-0 right-0 w-full bg-background md:hidden border-t transition-all duration-500 ease-in-out ${isToolbarExpanded ? 'h-40' : 'h-16'}`}>
            <div id="tools" className="rounded-t-lg p-2 flex justify-center" >
              <div className="flex space-x-1 items-center">
                <ToggleGroup
                  type="single"
                  value={fabricModeState}
                  onValueChange={(value: typeof fabricModeState) => {
                    handleToolChange(value)
                  }}
                >
                  <ToggleGroupItem value="drag" className="w-11 h-11" data-cy="drag_tool_mobile">
                    <Hand className="w-6 h-6" id="drag" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="selection" className="w-11 h-11" data-cy="selection_tool_mobile">
                    <BoxSelect className="w-6 h-6" id="select" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="rect" className="w-11 h-11" data-cy="rect_tool_mobile">
                    <Square className="w-6 h-6" id="square" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="freedraw" className="w-11 h-11" data-cy="freedraw_tool_mobile">
                    <PencilLine className="w-6 h-6" id="pencil" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="type" className="w-11 h-11" data-cy="type_tool_mobile">
                    <TypeIcon className="w-6 h-6" id="type" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <Button variant="ghost" size="icon" className="w-11 h-11" onClick={handleCanvasClear} data-cy="clear_all_button_mobile">
                  <Trash2 className="w-6 h-6" />
                  <span className="sr-only">Clear canvas</span>
                </Button>
                <Button
                  data-cy="insert_image_button_mobile"
                  variant="ghost"
                  size="icon"
                  className="w-11 h-11"
                  onClick={() => document.getElementById('imageInput')?.click()}
                >
                  <ImagePlus className="w-6 h-6" />
                </Button>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {!preparingProject && (
                  <DialogDrawer preparedProject={preparingProject} canvasFabric={canvas} memeName={memeName} setMemeName={setMemeName} memeDownload={handleMemeSave} />
                )}

              </div>
            </div>
            {isToolbarExpanded && (
              <div className="flex flex-wrap gap-4 items-center w-full justify-center h-full align-middle my-auto transition-all duration-500 ease-in-out">
                {drawingMode.current === "rect" && (
                  <>
                    <Separator orientation="vertical" className="h-12 hidden md:block" />
                    <Popover>
                      <PopoverTrigger data-cy="rectcolor_paint_mobile"><PaintBucket className="w-7 h-7 mx-2" fill={rectColor} /></PopoverTrigger>
                      <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                        <HexColorPicker color={rectColor} onChange={(value) => handleChangeRectColor(value, canvas)} />
                        <div className="flex flex-col gap-2 rounded p-2">
                          {presetColors.map((presetColor) => (
                            <Button
                              key={`rect-${presetColor}`}
                              id={`rect-${presetColor}`}
                              data-cy={`rectcolor-${presetColor}-mobile`}
                              className="w-10 h-10"
                              style={{ background: presetColor }}
                              onClick={() => handleChangeRectColor(presetColor, canvas)}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Separator orientation="vertical" className="h-12 hidden md:block" />
                    <Slider value={rectStrokeWidth} max={100} step={1} onValueChange={(i) => handleStrokeWidthChange(i[0], canvas)} className="w-40" data-cy="rectstroke_width_slider_mobile" />
                    <Input type="number" onChange={(e) => handleStrokeWidthChange(parseInt(e.target.value), canvas)} value={rectStrokeWidth[0]} width={5} className="w-20" data-cy="rectstroke_width_input_mobile" />
                    <Popover>
                      <PopoverTrigger data-cy="rectstroke_color_button_mobile">
                        <Minus className="w-7 h-7" id="rectstrokecolor" strokeWidth={10} /></PopoverTrigger>
                      <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                        <HexColorPicker color={rectStrokeColor} onChange={(value) => handleStrokeColorChange(value, canvas)} />
                        <div className="flex flex-col gap-2 rounded p-2">
                          {presetColors.map((presetColor) => (
                            <Button
                              key={`rectstroke-${presetColor}`}
                              id={`rectstroke-${presetColor}`}
                              data-cy={`rectstroke-${presetColor}-mobile`}
                              className="w-10 h-10"
                              style={{ background: presetColor }}
                              onClick={() => handleStrokeColorChange(presetColor, canvas)}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </>
                )}
                {drawingMode.current === "freedraw" && (
                  <>
                    <Separator orientation="vertical" className="h-12 hidden md:block" />
                    <Popover>
                      <PopoverTrigger data-cy="freedrawcolor_paint_mobile"><PaintBucket fill={color} className="w-7 h-7" id="freedrawcolor" /></PopoverTrigger>
                      <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                        <HexColorPicker color={color} onChange={(value) => handleChangeColor(value, canvas)} />
                        <div className="flex flex-col gap-2 rounded p-2">
                          {presetColors.map((presetColor) => (
                            <Button
                              key={presetColor}
                              id={`freedraw-${presetColor}`}
                              data-cy={`freedraw-${presetColor}-mobile`}
                              className="w-10 h-10"
                              style={{ background: presetColor }}
                              onClick={() => handleChangeColor(presetColor, canvas)}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Slider value={drawingWidth} max={100} step={1} onValueChange={(i) => setDrawingWidth(i)} className="w-56" data-cy="freedraw_width_slider_mobile" />
                    <Input type="number" onChange={(e) => setDrawingWidth([parseInt(e.target.value)])} value={drawingWidth[0]} width={5} className="w-20" data-cy="freedraw_width_input_mobile" />
                  </>
                )}
                {drawingMode.current === "type" && (
                  <>
                    <FontSelect canvas={canvas} value={fontFamily} onValueChange={(value) => handleChangeFontFamily(value, canvas)} data-cy="font_type_select_mobile" />
                    <Popover>
                      <PopoverTrigger data-cy="fontcolor_paint_button_mobile"><TypeOutline className="w-5 h-5" fill={fontColor} /></PopoverTrigger>
                      <PopoverContent className="flex flex-row gap-4 items-center outline-2">
                        <HexColorPicker color={fontColor} onChange={(value) => handleChangeFontColor(value, canvas)} />
                        <div className="flex flex-col gap-2 rounded p-2">
                          {presetColors.map((presetColor) => (
                            <Button
                              key={presetColor}
                              className="w-10 h-10"
                              data-cy={`type-${presetColor}-mobile`}
                              style={{ background: presetColor }}
                              onClick={() => handleChangeFontColor(presetColor, canvas)}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <ToggleStylesGroup platform="_mobile" value={fontStyle} onValueChange={handleChangefontStyle} />
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </TooltipProvider>
    </div>
  )

}

export default App