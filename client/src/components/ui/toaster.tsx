import React from 'react';
import { useToast } from "../../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast.tsx"
import { Leaf } from "lucide-react" // Optional nature icon

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex gap-3">
              {/* Optional nature icon based on variant */}
              {variant === "success" && (
                <div className="mt-0.5 flex-shrink-0 text-green-500">
                  <Leaf className="h-4 w-4" />
                </div>
              )}
              
              <div className="grid flex-1 gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {action}
                <ToastClose className="relative top-0 right-0" />
              </div>
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}