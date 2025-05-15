import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Leaf } from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-green-600 text-white",
        secondary: "border-transparent bg-gray-100 text-gray-800",
        destructive: "border-transparent bg-red-100 text-red-800",
        outline: "border-gray-300 bg-white text-gray-700",
        nature: "border-transparent bg-green-50 text-green-700",
        warning: "border-transparent bg-yellow-50 text-yellow-800",
        organic: "border-transparent bg-amber-50 text-amber-800",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
      },
      icon: {
        true: "pl-2.5 gap-1",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "nature",
        icon: true,
        className: "pl-2 pr-3",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      icon: false,
    },
  }
)

export interface BadgeProps
extends React.HTMLAttributes<HTMLDivElement>,
Omit<VariantProps<typeof badgeVariants>, "icon"> {
icon?: React.ReactNode
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
   const hasIcon = Boolean(icon) || variant === "nature"
   return (
    <div className={cn(badgeVariants({ variant, size, icon: hasIcon }), className)} {...props}>
      {variant === "nature" && <Leaf className="h-3 w-3 flex-shrink-0" />}
      {icon && variant !== "nature" && icon}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }