import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-white", // Changed from bg-muted to white
        "shadow-sm", // Soft shadow
        "border border-gray-100", // Very light border for depth
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };