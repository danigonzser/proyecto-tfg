"use client"
import { FolderPlus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { createCatalogue } from "@/lib/action_create_catalogue"
import { redirect, useRouter } from 'next/navigation'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"

const catalogueSchema = z.object({
  title: z.string().min(1, "Catalogue's title is required").max(100, "The title cannot be longer than 100 characters"),
  description: z.string().min(1, "Catalogue's description is required").max(500, "The description cannot be longer than 500 characters")
})

type CatalogueFormValues = z.infer<typeof catalogueSchema>

export default function CreateCatalogues() {

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [isPending, startTransition] = useTransition()

  const [isOpened, setIsOpened] = useState(false)

  const router = useRouter()

  const form = useForm<CatalogueFormValues>({
    resolver: zodResolver(catalogueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  async function onSubmit(data: CatalogueFormValues) {
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })

      const result = await createCatalogue(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: "There was an error during the creation of the catalogue.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Successful catalogue creation",
          description: "The catalogue was created successfully.",
          variant: "success",
        })
        form.reset()
      }
      setIsOpened(false)
      router.refresh()
    })
  }

  if (isDesktop) {

    return (
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            id="create_catalogue_button"
          >
            <FolderPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-black">Create new catalogue</DialogTitle>
            <DialogDescription>
              Create a new catalogue for your memes.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Funny collection" {...field} id="catalogue_title_input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="This is the catalogue for all the funny memes I've found on the internet."
                        {...field}
                        id="catalogue_description_textarea"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="destructive" className="font-black text-destructive-foreground" id="cancel_button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" id="submit_button" disabled={isPending} className="font-black">
                  {isPending ? "Creating..." : "Create catalogue"}
                </Button>
              </DialogFooter>

            </form>
          </Form>
        </DialogContent>
      </Dialog >
    )

  } else {

    return (
      <Drawer open={isOpened} onOpenChange={setIsOpened}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost">
            <FolderPlus />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-card p-4">
          <DrawerHeader>
            <DrawerTitle className="font-black">Create new catalogue</DrawerTitle>
            <DrawerDescription>
              Create a new catalogue for your memes.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Funny collection" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="This is the catalogue for all the funny memes I've found on the internet."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter className="flex-row justify-end space-x-2 gap-y-2">
                <Button type="submit" disabled={isPending} className="font-black">
                  {isPending ? "Creating..." : "Create catalogue"}
                </Button>
                <DrawerClose asChild>
                  <Button type="button" variant="destructive" className="font-black text-destructive-foreground">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>

            </form>
          </Form>
        </DrawerContent>
      </Drawer >
    )

  }

}