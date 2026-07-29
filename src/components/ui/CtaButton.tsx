"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const ctaVariants = cva(
  "relative flex flex-col items-start justify-center font-medium transition-colors duration-300 overflow-hidden group touch-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-transparent text-foreground border border-border hover:bg-secondary/80",
        ghost: "bg-transparent text-foreground hover:bg-white/5",
      },
      size: {
        sm: "px-6 py-3 rounded-full text-xs tracking-widest uppercase gap-1.5",
        md: "px-8 py-4 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase gap-2",
        lg: "px-10 py-5 md:px-12 md:py-6 rounded-full text-sm md:text-base font-semibold tracking-widest uppercase gap-2.5",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    }
  }
);

export interface CtaButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof ctaVariants> {
  href?: string;
  showArrow?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const CtaButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, CtaButtonProps>(
  ({ className, variant, size, disabled, loading, showArrow = true, href, children, onMouseMove, onMouseLeave, onClick, ...props }, forwardedRef) => {
    
    const localRef = useRef<HTMLElement | null>(null);
    const ref = forwardedRef || localRef;

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
      const node = (ref as React.MutableRefObject<HTMLElement | null>).current;
      if (!node) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = node.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMouseMove?.(e as any);
    };

    const reset = (e: React.MouseEvent<HTMLElement>) => {
      setPosition({ x: 0, y: 0 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMouseLeave?.(e as any);
    };

    const content = (
      <span className="relative z-10 flex flex-col items-start">
        <span className="leading-none mt-1">{children}</span>
        
        {loading ? (
          <Loader2 className="w-[20px] h-[20px] animate-spin mt-2" />
        ) : showArrow ? (
          <ArrowUpRight 
            className="w-[22px] h-[22px] stroke-[1.5] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" 
          />
        ) : null}
      </span>
    );

    const animationProps = {
      animate: { x: position.x, y: position.y },
      transition: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 }
    };

    const isEffectivelyDisabled = disabled || loading;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyProps = props as any;

    if (href) {
      return (
        <MotionLink
          href={href}
          ref={ref as React.LegacyRef<HTMLAnchorElement>}
          onMouseMove={isEffectivelyDisabled ? undefined : handleMouse}
          onMouseLeave={isEffectivelyDisabled ? undefined : reset}
          className={cn(ctaVariants({ variant, size, disabled: isEffectivelyDisabled }), className)}
          aria-disabled={isEffectivelyDisabled}
          {...(isEffectivelyDisabled ? {} : animationProps)}
          {...anyProps}
        >
          {content}
        </MotionLink>
      );
    }

    return (
      <motion.button
        ref={ref as React.LegacyRef<HTMLButtonElement>}
        disabled={isEffectivelyDisabled}
        onClick={onClick}
        onMouseMove={isEffectivelyDisabled ? undefined : handleMouse}
        onMouseLeave={isEffectivelyDisabled ? undefined : reset}
        className={cn(ctaVariants({ variant, size, disabled: isEffectivelyDisabled }), className)}
        {...(isEffectivelyDisabled ? {} : animationProps)}
        {...anyProps}
      >
        {content}
      </motion.button>
    );
  }
);
CtaButton.displayName = "CtaButton";
