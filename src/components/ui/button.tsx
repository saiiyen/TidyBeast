import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-hero text-primary-foreground hover:shadow-elegant transform hover:scale-105 hover:animate-pulse-glow btn-enhanced",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-elegant transform hover:scale-105",
        outline:
          "border border-input bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transform hover:scale-105 transition-all duration-300",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-soft transform hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark",
        premium: "bg-gradient-premium text-primary-dark hover:shadow-elegant transform hover:scale-105 hover:animate-pulse-glow btn-enhanced",
        cta: "bg-gradient-hero text-primary-foreground hover:shadow-elegant transform hover:scale-110 hover:animate-pulse-glow btn-enhanced font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 py-3 text-lg",
        xl: "h-14 rounded-lg px-10 py-4 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }