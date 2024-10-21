import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CirclePlus, ClockIcon, ComputerIcon, FolderIcon, HomeIcon, Menu, Minus, Plus, PlusIcon, SaveIcon, SettingsIcon, ShareIcon, SpellCheckIcon, StarIcon, StoreIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import ImportMeme from "../components/ui/importmeme.svg"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPortal, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { Suspense } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import DrawerDialogDemo from "@/components/responsive-drawer"
import Catalogues from "@/components/catalogues"
import { Skeleton } from "@/components/ui/skeleton"
import Search from "@/components/search"
import CreateCatalogues from "@/components/create_catalogues"
import { Metadata } from "next"
import { CataloguesSkeleton } from "@/components/catalogues_skeleton"

export const metadata: Metadata = {
  title: 'Catalogues',
}

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {

  const query = searchParams?.query || ''

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-2">
        <Search placeholder="Search catalogues..." />
        <CreateCatalogues />
      </div>
      <Suspense key={query} fallback={<CataloguesSkeleton />}>
        <Catalogues query={query} />
      </Suspense>
    </>
  )
}