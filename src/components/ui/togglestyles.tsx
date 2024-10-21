import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Style } from "@/lib/types"
import { Bold, Italic, Underline } from "lucide-react"

export function ToggleStylesGroup({ value, onValueChange }: { value: string[], onValueChange: (value: string[]) => void }) {

  return (
    <ToggleGroup type="multiple" value={value} onValueChange={onValueChange}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}