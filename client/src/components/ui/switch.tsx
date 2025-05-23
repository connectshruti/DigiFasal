import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "../../lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "transition-all duration-200 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-100 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-green-200 data-[state=unchecked]:bg-gray-100",
      "hover:data-[state=checked]:bg-green-300 hover:data-[state=unchecked]:bg-gray-200",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white",
        "shadow-sm transition-all duration-200",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        "data-[state=checked]:shadow-green-100"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }