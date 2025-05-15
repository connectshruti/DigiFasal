import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 gap-2",
  {
    variants: {
      variant: {
        default: [
          "bg-white border border-gray-200 text-gray-700",
          "hover:bg-gray-50 hover:border-gray-300",
          "data-[state=on]:bg-green-50 data-[state=on]:border-green-200 data-[state=on]:text-green-700"
        ],
        outline: [
          "border border-gray-200 bg-transparent text-gray-700",
          "hover:bg-gray-50 hover:border-gray-300",
          "data-[state=on]:bg-green-50 data-[state=on]:border-green-200 data-[state=on]:text-green-700"
        ],
        nature: [
          "bg-white border border-gray-200 text-gray-700",
          "hover:bg-gray-50 hover:shadow-sm",
          "data-[state=on]:bg-green-100 data-[state=on]:border-green-300 data-[state=on]:text-green-800"
        ]
      },
      size: {
        default: "h-10 px-4 min-w-10",
        sm: "h-8 px-3 min-w-8 text-xs",
        lg: "h-12 px-5 min-w-12",
        icon: "h-10 w-10" // Square icon-only variant
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }