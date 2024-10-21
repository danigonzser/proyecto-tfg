import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import * as fabric from 'fabric'

const fonts = {
  'Roboto': 'Roboto',
  'Times New Roman': 'Times New Roman',
  'Arial': 'Arial',
  'Impact': 'Impact',
}

function handleSelectFont(font: string, canvas: fabric.Canvas | undefined, onValueChange: (value: string) => void
) {

  if (canvas === undefined) return

  onValueChange(font)

  const selectedElement = canvas.getActiveObject()

  if (!selectedElement || selectedElement?.type === "activeSelection") return

  const text = selectedElement as fabric.Textbox

  text.set("fontFamily", font)

  canvas.renderAll()
}


export function FontSelect({ canvas, value, onValueChange }: { canvas: fabric.Canvas | undefined, value: string, onValueChange: (value: string) => void }) {

  return (
    <Select onValueChange={(value) => handleSelectFont(value, canvas, onValueChange)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.keys(fonts).map((fontName) => (
            <SelectItem key={fontName} value={fontName} className={fontName} > {fontName}</SelectItem >
          ))}
        </SelectGroup>
      </SelectContent>
    </Select >
  )
}