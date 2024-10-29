import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Style } from "@/lib/types"
import { Bold, Italic, Underline } from "lucide-react"

export function ToggleStylesGroup({ platform, value, onValueChange }: { platform: string, value: string[], onValueChange: (value: string[]) => void }) {

  return (
    <ToggleGroup type="multiple" value={value} onValueChange={onValueChange}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold" data-cy={`font_style_bold_button${platform}`}>
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" data-cy={`font_style_italics_button${platform}`}>
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline" data-cy={`font_style_underline_button${platform}`}>
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}