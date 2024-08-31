"use client"
import { useUrlHash } from "@/hooks"
import { cn } from "@/lib/utils"
import React from "react"
import App from "../ui"
import { Separator } from "../ui/separator"

type hashType = `#${string}`
type styleModeType = "bobble" | "link"

const DEFAULT_STYLE_MODE: styleModeType = "link"

export type TabNavItem = {
  title: string
  hash: hashType
  component: React.ReactNode
  description?: string
  // icon could be added here later: icon: React.ReactNode or icon: IconType
}

export type TabsProps = {
  items: TabNavItem[]
  className?: string
  suspense?: boolean
  showTitle?: boolean
  showSeparator?: boolean
  styleMode?: styleModeType
  showTitleSeparator?: boolean
  tabsClassName?: string
  selectedItemClassName?: string
}

export default function Tabs({
  items,
  className = "",
  suspense = true,
  showTitle = false,
  showSeparator = true,
  showTitleSeparator = false,
  styleMode = DEFAULT_STYLE_MODE,
  tabsClassName = "",
  selectedItemClassName = "",
}: TabsProps) {
  const [hash, setHash] = useUrlHash(items[0]?.hash)

  const selectedItem = items.find((item) => item.hash === hash)

  return (
    <div className={cn("space-y-6 pb-16 md:block", className)}>
      {items && (
        <HorizontalNav
          items={items}
          currentHash={hash}
          onChange={(hash: hashType) => setHash(hash)}
          styleMode={styleMode}
          className={tabsClassName}
          selectedItemClassName={selectedItemClassName}
        />
      )}
      {showSeparator && (
        <Separator className={cn("my-1", styleMode === "link" ? "!m-0" : "!mt-2")} />
      )}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {selectedItem && showTitle && (
          <div className="flex flex-col">
            <h2 className={cn("text-2xl font-bold tracking-tight mb-3")}>{selectedItem.title}</h2>
            {selectedItem?.description && (
              <p className={cn("text-muted-foreground")}>{selectedItem.description}</p>
            )}
            {showTitleSeparator && <Separator className="my-3" />}
          </div>
        )}

        {suspense ? (
          <App.ErrorBoundary key={selectedItem?.hash}>
            <App.Suspense>{selectedItem?.component}</App.Suspense>
          </App.ErrorBoundary>
        ) : (
          <>{selectedItem?.component}</>
        )}
      </div>
    </div>
  )
}

type HorizontalNavProps = {
  items: TabNavItem[]
  currentHash: string
  className?: string
  onChange?: (hash: hashType) => void
  itemClassName?: string
  styleMode?: styleModeType
  selectedItemClassName?: string
}

function HorizontalNav({
  items,
  className = "",
  onChange,
  currentHash,
  itemClassName = "",
  styleMode = "link",
  selectedItemClassName = "",
}: HorizontalNavProps) {
  return (
    <nav className={cn("flex flex-row gap-2 overflow-x-auto", className)}>
      {items.map((item, i) => {
        return (
          <span
            key={i}
            onClick={() => {
              onChange?.(item.hash)
            }}
            className={cn(
              "block py-2 px-4 text-gray-700 text-sm min-w-fit font-medium hover:text-gray-900 rounded-lg cursor-pointer",
              styleMode === "link" && "hover:underline",
              styleMode === "bobble" && "hover:bg-gray-100",
              itemClassName,
              currentHash === item.hash &&
                (styleMode === "bobble"
                  ? "bg-gray-100 text-gray-900 hover:no-underline"
                  : "border-b-2 border-gray-900 text-gray-900 rounded-none hover:no-underline"),
              currentHash === item.hash && selectedItemClassName,
            )}
          >
            {item.title}
          </span>
        )
      })}
    </nav>
  )
}
