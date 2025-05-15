import React from 'react';
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "../../lib/utils"

interface AspectRatioProps 
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string
  overlay?: React.ReactNode
  variant?: "default" | "nature" | "rounded"
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, overlay, variant = "default", ...props }, ref) => {
  const variants = {
    default: "",
    nature: "overflow-hidden border border-gray-200 shadow-sm",
    rounded: "overflow-hidden rounded-xl border border-gray-200 shadow-sm"
  }

  return (
    <div className="relative w-full">
      <AspectRatioPrimitive.Root
        ref={ref}
        className={cn(
          "overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          {overlay}
        </div>
      )}
    </div>
  )
})

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName

export { AspectRatio }