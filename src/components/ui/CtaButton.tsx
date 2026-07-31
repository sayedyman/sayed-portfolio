"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
        primary: "bg-primary text-primary-foreground hover:brightness-105",
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

    const [isHovered, setIsHovered] = useState(false);

    // Independent motion values for physics composition
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Fast spring for magnetic tracking
    const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
    const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });
    
    // Smooth, premium spring for hover scale and lift
    const hoverScale = useSpring(1, { stiffness: 200, damping: 20, mass: 1 });
    const hoverLift = useSpring(0, { stiffness: 200, damping: 20, mass: 1 });

    // Combine magnetic Y and hover lift Y without them fighting
    const combinedY = useTransform(() => smoothY.get() + hoverLift.get());

    const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
      if (variant !== "primary") return;
      const node = (ref as React.MutableRefObject<HTMLElement | null>).current;
      if (!node) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = node.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      mouseX.set(middleX * 0.2);
      mouseY.set(middleY * 0.2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMouseMove?.(e as any);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled || loading) return;
      setIsHovered(true);
      if (variant === "primary") {
        hoverScale.set(1.03);
        hoverLift.set(-2);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.onMouseEnter?.(e as any);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled || loading) return;
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
      hoverScale.set(1);
      hoverLift.set(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMouseLeave?.(e as any);
    };

    const content = (
      <>
        {variant === "primary" && (
          <motion.div
            initial={{ left: "-150%", skewX: -20 }}
            animate={isHovered ? {
              left: "250%",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            } : {
              left: "-150%",
              transition: { duration: 0 }
            }}
            className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none"
          />
        )}
        <span className="relative z-10 flex flex-col items-start">
          <span className="leading-none mt-1">{children}</span>
          
          {loading ? (
            <Loader2 className="w-[20px] h-[20px] animate-spin mt-2" />
          ) : showArrow ? (
            <ArrowUpRight 
              className="w-[22px] h-[22px] stroke-[1.5]" 
            />
          ) : null}
        </span>
      </>
    );

    const isEffectivelyDisabled = disabled || loading;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyProps = props as any;

    if (href) {
      return (
        <MotionLink
          href={href}
          ref={ref as React.LegacyRef<HTMLAnchorElement>}
          onMouseEnter={handleMouseEnter}
          onMouseMove={isEffectivelyDisabled ? undefined : handleMouse}
          onMouseLeave={handleMouseLeave}
          className={cn(ctaVariants({ variant, size, disabled: isEffectivelyDisabled }), className)}
          aria-disabled={isEffectivelyDisabled}
          style={!isEffectivelyDisabled ? { x: smoothX, y: combinedY, scale: hoverScale } : undefined}
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
        onMouseEnter={handleMouseEnter}
        onMouseMove={isEffectivelyDisabled ? undefined : handleMouse}
        onMouseLeave={handleMouseLeave}
        className={cn(ctaVariants({ variant, size, disabled: isEffectivelyDisabled }), className)}
        style={!isEffectivelyDisabled ? { x: smoothX, y: combinedY, scale: hoverScale } : undefined}
        {...anyProps}
      >
        {content}
      </motion.button>
    );
  }
);
CtaButton.displayName = "CtaButton";
