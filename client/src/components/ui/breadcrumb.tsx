import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
    variant?: "default" | "nature"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    className={cn(
      variant === "nature" ? "text-green-800" : "text-gray-600",
      className
    )}
    {...props}
  />
))
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-x-2 text-sm",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li"> & {
    variant?: "default" | "nature"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "inline-flex items-center",
      variant === "nature" ? "text-green-700" : "text-gray-600",
      className
    )}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
    variant?: "default" | "nature"
  }
>(({ asChild, className, variant = "default", ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-green-600",
        variant === "nature" ? "font-medium" : "font-normal",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span"> & {
    variant?: "default" | "nature"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(
      "font-medium",
      variant === "nature" ? "text-green-800" : "text-gray-900",
      className
    )}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"li"> & { variant?: "default" | "nature" }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(
      "[&>svg]:w-4 [&>svg]:h-4",
      variant === "nature" ? "text-green-500" : "text-gray-400",
      className
    )}
    {...props}
  >
    {children ?? (variant === "nature" ? <Leaf className="h-3 w-3" /> : <ChevronRight />)}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: "default" | "nature" }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-9 w-9 items-center justify-center",
      variant === "nature" ? "text-green-500" : "text-gray-400",
      className
    )}
    {...props}
  >
    {variant === "nature" ? (
      <Leaf className="h-4 w-4 rotate-90" />
    ) : (
      <MoreHorizontal className="h-4 w-4" />
    )}
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}