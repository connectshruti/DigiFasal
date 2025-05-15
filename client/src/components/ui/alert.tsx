import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Leaf } from "lucide-react"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border p-5 shadow-sm [&>svg~*]:pl-9 [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-5",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 text-gray-800 [&>svg]:text-green-600",
        success: "bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-600",
        destructive: "bg-red-50 border-red-200 text-red-800 [&>svg]:text-red-600",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800 [&>svg]:text-yellow-600",
        info: "bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    const defaultIcon = {
      default: <Leaf className="h-5 w-5" />,
      success: <CheckCircle2 className="h-5 w-5" />,
      destructive: <AlertCircle className="h-5 w-5" />,
      warning: <AlertCircle className="h-5 w-5" />,
      info: <AlertCircle className="h-5 w-5" />,
    }[variant || "default"]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon || defaultIcon}
        {children}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-2 font-serif font-semibold leading-none", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }