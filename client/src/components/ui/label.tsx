import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const labelVariants = cva(
  "text-base font-medium text-[#1f2937] transition-colors duration-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "",
        subtle: "text-[#6b7280]",
        success: "text-[#4a7c59]",
        error: "text-[#dc2626]",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size }), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }