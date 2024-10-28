import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"
import { ImageIcon, Palette, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Skeleton } from "./ui/skeleton"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Props {
  setPreparingProject: (preparingProject: boolean) => void,
  handleCanvasSize: (width: number, height: number) => void,
  handlebgColorEditableArea: (color: string) => void,
  handleSetMeme: (data: string) => Promise<void>
}
export const NewProjectForm: React.FC<Props> = ({
  setPreparingProject,
  handleCanvasSize,
  handlebgColorEditableArea,
  handleSetMeme
}) => {

  const [isDragging, setIsDragging] = useState(false)

  function handleDragOver(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeaveEvent(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    setIsDragging(false)
  }

  function handleDropEvent(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    setIsDragging(false)
    const files = Array.from(event.dataTransfer.files)
    handleFiles(files)
  }

  function onFileSelect(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            handleSetMeme(e.target.result.toString()).then(() => {
              setPreparingProject(false)
            })
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const [width, setWidth] = useState(1920)
  const [height, setHeight] = useState(1080)
  const [file, setFile] = useState<File | null>(null)
  const [bgColor, setBgColor] = useState("#FFFFFF")

  const presetColors = ["#FFEA00", "#000000", "#ff0000", "#0000ff", "#008000"]

  const handleBlankSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!width || !height || !bgColor) {
      toast({
        title: "Error",
        description: "Please specify both width and height for a blank canvas.",
        variant: "destructive",
      })
      return
    }

    handleCanvasSize(width, height)

    handlebgColorEditableArea(bgColor)

    toast({
      title: "Success",
      description: `Blank project initialized: ${width}x${height}`,
    })

    setPreparingProject(false)
  }

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "Error",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    handleFiles([file])



    setPreparingProject(false)


    toast({
      title: "Success",
      description: `Project initialized from image: ${file.name}`,
    })
  }

  return (
    <section className="h-full relative w-full overflow-hidden bg-background md:rounded-tl-3xl">
      {/* Gradient overlay */}
      <div id="height-canvas" className="h-full absolute inset-0 bg-gradient-radial from-yellow-400/20 via-yellow-500/5 to-transparent"></div>

      <div className="flex justify-center px-4 mx-auto h-full items-center pb-36 sm:pb-16">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Image
              src="/icon.svg"
              width={60}
              height={60}
              alt="Picture of the logo"
              className="rounded-full shadow-lg"
            />
            <h1 className="text-4xl font-bold text-primary drop-shadow-glow">Memes Editor</h1>
          </div>
          <Card className="w-full box-s bg-card backdrop-blur-sm">
            <CardContent className="p-6 shadow-2xl shadow-primary rounded-lg">
              <Tabs defaultValue="blank" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-secondary-foreground/20 mb-4">
                  <TabsTrigger value="blank" className="data-[state=active]:bg-primary data-[state=active]:font-black data-[state=active]:text-primary-foreground font-bold">Blank Canvas</TabsTrigger>
                  <TabsTrigger value="image" className="data-[state=active]:bg-primary data-[state=active]:font-black data-[state=active]:text-primary-foreground font-bold">From Image</TabsTrigger>
                </TabsList>
                <TabsContent value="blank">
                  <form onSubmit={handleBlankSubmit} className="space-y-8 mt-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width" className="text-card-foreground font-bold">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          placeholder="Enter width"
                          className="font-semibold text-xl"
                          value={width}
                          onChange={(e) => setWidth(parseInt(e.target.value))}
                          min="1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height" className="text-card-foreground font-bold">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="Enter height"
                          className="font-semibold text-xl"
                          value={height}
                          onChange={(e) => setHeight(parseInt(e.target.value))}
                          min="1"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="bg-color" className="text-card-foreground font-bold">Background Color</Label>
                        <div className="flex items-center space-x-2">
                          <Popover>
                            <PopoverTrigger><Palette className={`w-5 h-5 stroke-[${bgColor}]`} /></PopoverTrigger>
                            <PopoverContent className="flex flex-row gap-4 items-center outline-2"> <HexColorPicker color={bgColor} onChange={setBgColor} /> <div className="flex flex-col gap-2 bg-card rounded p-2"> {presetColors.map((presetColor) => (
                              <Button
                                key={presetColor}
                                className="w-10 h-10"
                                style={{ background: presetColor }}
                                onClick={() => setBgColor(presetColor)}
                              />
                            ))} </div> </PopoverContent>
                          </Popover>
                          <Input
                            id="bg-color"
                            type="text"
                            value={bgColor}
                            className="font-semibold text-xl"
                            onChange={(e) => setBgColor(e.target.value)}
                          />
                          <div
                            className="w-10 h-10 rounded-full border border-card-foreground"
                            style={{ backgroundColor: bgColor }}
                            aria-label={`Selected color: ${bgColor}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      <Square className="mr-2 h-4 w-4 " /> <p className="font-black text-lg">Edit from blank canvas</p>
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="image">
                  <form onSubmit={handleImageSubmit} className="space-y-8 mt-8">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeaveEvent}
                      onDrop={handleDropEvent}
                      className={cn("h-[232px] py-10 border-2 border-dashed rounded-lg p-10 flex justify-center cursor-pointer", isDragging ? 'border-primary bg-primary/50' : 'border-card-foreground')}
                    >
                      <Label htmlFor="image-upload" className="flex align-middle items-center">
                        <p className="font-black text-lg text-center">
                          Drop an image here or click to select
                        </p>
                      </Label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                    </div>
                    {/* <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors">
                      <ImageIcon className="mr-2 h-4 w-4" /> Edit Uploaded Image
                    </Button> */}
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
