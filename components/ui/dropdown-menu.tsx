"use client"

import { Menu } from "@base-ui/react/menu"
import { cn } from "cn"

function DropdownMenu(props: Menu.Root.Props) {
  return <Menu.Root {...props} />
}

function DropdownMenuTrigger({
  className,
  ...props
}: Menu.Trigger.Props) {
  return (
    <Menu.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

function DropdownMenuContent({
  align = "end",
  className,
  ...props
}: Menu.Popup.Props & { align?: Menu.Positioner.Props["align"] }) {
  return (
    <Menu.Portal>
      <Menu.Positioner align={align} className="z-50">
        <Menu.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "min-w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: Menu.Item.Props) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
}
