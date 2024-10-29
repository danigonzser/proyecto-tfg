import { useMediaQuery } from "@/hooks/use-media-query"
import React, { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { BookImage, Check, ChevronsUpDown, DownloadIcon, Megaphone } from "lucide-react"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Catalogue } from "@prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { getCatalogues, setMemeInCatalogue } from "@/lib/getcatalogues"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { useToast } from "../hooks/use-toast"
import { Canvas, ImageFormat } from "fabric"
import { useRouter } from 'next/navigation'
import CreateCatalogues from "./create_catalogues"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please write a name.",
  }),
  extension: z.enum(["png", "jpeg"], {
    message: "Please select a extension.",
  }),
  catalogueId: z.string().min(1),
  catalogueName: z.string().min(1, {
    message: "Please select a catalogue.",
  }),
})

interface Props {
  preparedProject: boolean | undefined,
  canvasFabric: Canvas | undefined,
  memeName: string,
  setMemeName: (memeName: string) => void,
  memeDownload: (location: "local" | "catalogue", memeSaveName: string, memeFormat: ImageFormat) => void
}

export const DialogDrawer: React.FC<Props> = ({
  preparedProject,
  canvasFabric,
  memeName,
  setMemeName,
  memeDownload
}) => {

  const router = useRouter()

  const { toast } = useToast()

  const [catalogues, setCatalogues] = useState<Catalogue[]>([])

  useEffect(() => {
    async function get() {
      const cats = await getCatalogues()
      setCatalogues(cats)
    }

    get()
  }, [])

  const catalogueIdRef = useRef("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: memeName,
      extension: "png",
      catalogueId: catalogues.length > 0 ? catalogues[0].id : "No catalogue",
      catalogueName: catalogues.length > 0 ? catalogues[0].title : "No catalogue"
    }
  })

  function handleCanvasDownload(values: z.infer<typeof formSchema>) {

    if (optionSelected === "catalogue") {

      try {

        if (canvasFabric !== undefined && catalogues.length > 0) {

          if (values.catalogueId === "") {
            catalogueIdRef.current = catalogues[0].id
            values.catalogueId = catalogues[0].id
          }

          const memeJson = canvasFabric.toJSON()

          if (preparedProject) {
            toast({
              title: "Prepare your project first!",
              action: <Megaphone />
            })
          } else {

          }

          console.log("Meme JSON", JSON.stringify(memeJson))

          setMemeInCatalogue(values.catalogueId, values.name, JSON.stringify(memeJson)).then(() => {
            setOpen(false)

            if (typeof window !== 'undefined') {
              window.onbeforeunload = null
            }

          }).finally(() => {
            router.push(`/catalogues/${values.catalogueId}`)

            toast({
              variant: "success",
              title: "Your meme has been saved in " + values.catalogueName,
            })
          })

        } else {
          form.setError("catalogueName", {
            message: "Please select or create a catalogue."
          })
        }

      } catch (e) {
        console.log(e)
      }

    } else {

      memeDownload(optionSelected, values.name, values.extension)
      setOpen(false)

      toast({
        variant: "success",
        title: "Your meme has been downloaded locally",
      })

    }
  }

  type option = "local" | "catalogue"

  const [open, setOpen] = useState(false)
  const [openCatalogues, setOpenCatalogues] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [optionSelected, setOptionSelected] = useState<option>("local")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} data-test="download_meme_form">
        <DialogTrigger asChild>
          <Button data-cy="save_as_button" id="save_as_dialog" className="w-11 h-11 md:w-14 md:h-14 sm:text-base md:text-lg md:py-2.5 md:px-4 py-1.5 px-2 text-xl drop-shadow-md hover:drop-shadow-xl shadow-sm shadow-primary/50 dark:shadow-sm dark:shadow-primary/80 hover:scale-110 transition-all duration-300 bg-primary text-primary-foreground border-primary font-black focus:scale-125">
            <DownloadIcon className="w-7 h-7 stroke-primary-foreground" />
            <span className="sr-only">Download</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" data-test="download_meme_form">
          <DialogHeader>
            <DialogTitle className="text-2xl">Save meme</DialogTitle>
            <DialogDescription>Choose where you would like to save your meme:</DialogDescription>
          </DialogHeader>
          <div className="w-full h-full grid grid-cols-2 gap-6">
            <Button variant={optionSelected === "catalogue" ? "outline" : "secondary"} onClick={() => setOptionSelected("local")} data-cy="local_button_tab">
              <DownloadIcon className="mr-2 h-6 w-6" />
              Locally
            </Button>
            <Button variant={optionSelected === "catalogue" ? "secondary" : "outline"} onClick={() => setOptionSelected("catalogue")} data-cy="catalogue_button_tab">
              <BookImage className="h-6 w-6 mr-2" />
              Catalogue
            </Button>
          </div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>

          <Form {...form} >
            <form onSubmit={form.handleSubmit(handleCanvasDownload)} className="w-full space-y-6">

              <div className={cn("w-full", { "grid grid-cols-[1fr_100px] gap-2": optionSelected === "local" })}>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meme name</FormLabel>
                      <FormControl>
                        <Input data-cy="form_input_meme_name" placeholder="Funny meme's name" {...field} value={memeName} onChange={(valor) => {
                          form.setValue("name", field.value)
                          setMemeName(valor.target.value)
                        }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {optionSelected === "local" && (

                  <FormField
                    control={form.control}
                    name="extension"
                    data-test="hero-heading"
                    render={({ field }) => (
                      <FormItem id="meme_extension" data-cy="meme_extension">
                        <FormLabel>Extension</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} data-cy="select_extension">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue data-cy="select_value_extension_meme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="png" data-cy="png_meme_extension">.png</SelectItem>
                            <SelectItem value="jpeg" data-cy="jpeg_meme_extension">.jpeg</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {optionSelected === "catalogue" && (
                <div>

                  <FormField
                    control={form.control}
                    name="catalogueName"
                    render={({ field }) => (
                      <FormItem className="mb-5 flex items-center justify-between gap-2">
                        <Popover open={openCatalogues} onOpenChange={setOpenCatalogues}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? catalogues.find(
                                    (catalogue) => catalogue.title === field.value
                                  )?.title
                                  : "Select catalogue"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <CreateCatalogues />
                          <PopoverContent className="w-[350px] p-0">
                            <Command>
                              <CommandInput placeholder="Search catalogue..." />
                              <CommandList>
                                <CommandEmpty>No catalogue found.</CommandEmpty>
                                <CommandGroup>
                                  {catalogues.map((catalogue) => (
                                    <CommandItem
                                      value={catalogue.title}
                                      key={catalogue.id}
                                      onSelect={() => {
                                        form.setValue("catalogueName", catalogue.title)
                                        form.setValue("catalogueId", catalogue.id)
                                        setOpenCatalogues(false)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          catalogue.title === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {catalogue.title}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
              )}

              <DialogFooter className="flex-row justify-end space-x-2 gap-y-2">
                <Button data-cy="form_submit_button" type="submit" className="text-primary-foreground font-black">Submit</Button>
                <Button data-cy="form_cancel_button" type="button" className="text-destructive-foreground font-black" variant="destructive" onClick={() => {
                  setOpen(false)
                  setTimeout(() => document.getElementById('save_as_dialog')?.blur(), 400)
                }} >Cancel</Button>
              </DialogFooter>
            </form>
          </Form>

        </DialogContent>
      </Dialog >
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button className="w-11 h-11 md:w-14 md:h-14 sm:text-base md:text-lg md:py-2.5 md:px-4 py-1.5 px-2 text-xl drop-shadow-md hover:drop-shadow-xl shadow-sm shadow-primary/50 dark:shadow-sm dark:shadow-primary/80 hover:scale-110 transition-all duration-300 bg-primary text-primary-foreground border-primary font-black focus:scale-110" id="save_as_drawer">
          <DownloadIcon className="w-7 h-7 stroke-primary-foreground" data-cy="insert_image_button_mobile" />
          <span className="sr-only">Download</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px] p-5">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Save meme</DrawerTitle>
          <DrawerDescription>Choose where you would like to save your meme:</DrawerDescription>
        </DrawerHeader>
        <div className="w-full h-full grid grid-cols-2 gap-6">
          <Button data-cy="local_button_tab_mobile" variant={optionSelected === "catalogue" ? "outline" : "secondary"} onClick={() => setOptionSelected("local")}>
            <DownloadIcon className="mr-2 h-6 w-6" />
            Locally
          </Button>
          <Button data-cy="catalogue_button_tab_mobile" variant={optionSelected === "catalogue" ? "secondary" : "outline"} onClick={() => setOptionSelected("catalogue")}>
            <BookImage className="h-6 w-6 mr-2" />
            Catalogue
          </Button>
        </div>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleCanvasDownload)} className="w-full space-y-6">

            <div className={cn("w-full", { "grid grid-cols-[1fr_100px] gap-2": optionSelected === "local" })}>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meme name</FormLabel>
                    <FormControl>
                      <Input data-cy="form_input_meme_name_mobile" placeholder="Funny meme's name" {...field} value={memeName} onChange={(valor) => {
                        form.setValue("name", field.value)
                        setMemeName(valor.target.value)
                      }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {optionSelected === "local" && (

                <FormField
                  control={form.control}
                  name="extension"
                  render={({ field }) => (
                    <FormItem data-cy="meme_extension_mobile">
                      <FormLabel>Extension</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem data-cy="png_meme_extension_mobile" value="png">.png</SelectItem>
                          <SelectItem data-cy="jpeg_meme_extension_mobile" value="jpeg">.jpeg</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {optionSelected === "catalogue" && (
              <div>

                <FormField
                  control={form.control}
                  name="catalogueName"
                  render={({ field }) => (
                    <FormItem className="mb-5 flex items-center justify-between gap-2">
                      <Popover open={openCatalogues} onOpenChange={setOpenCatalogues}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? catalogues.find(
                                  (catalogue) => catalogue.title === field.value
                                )?.title
                                : "Select catalogue"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <FormMessage />
                        <CreateCatalogues />
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Search catalogue..." />
                            <CommandList>
                              <CommandEmpty>
                                No catalogue found.
                              </CommandEmpty>
                              <CommandGroup>
                                {catalogues.map((catalogue) => (
                                  <CommandItem
                                    value={catalogue.title}
                                    key={catalogue.id}
                                    onSelect={() => {
                                      form.setValue("catalogueName", catalogue.title)
                                      form.setValue("catalogueId", catalogue.id)
                                      setOpenCatalogues(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        catalogue.title === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {catalogue.title}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

              </div>
            )}

            <DrawerFooter className="flex-row justify-end space-x-2 gap-y-2">
              <Button data-cy="form_submit_button_mobile" type="submit" className="text-primary-foreground font-black">Submit</Button>
              <Button type="button" className="text-destructive-foreground font-black" variant="destructive" onClick={() => {
                setOpen(false)
                setTimeout(() => document.getElementById('save_as_dialog')?.blur(), 400)
              }} >Cancel</Button>
            </DrawerFooter>
          </form>
        </Form>

      </DrawerContent>
    </Drawer>
  )
}