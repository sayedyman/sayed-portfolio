"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/design-system/motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  animated?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  className,
  animated = true,
}: SectionHeaderProps) {
  
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const ContentWrapper = animated ? motion.div : "div";
  const wrapperProps = animated ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10% 0px" }
  } : {};

  const ItemWrapper = animated ? motion.div : "div";
  const itemProps = animated ? { variants: staggerItem } : {};

  return (
    <ContentWrapper 
      className={cn("flex flex-col mb-16 md:mb-20 lg:mb-24", alignmentClasses[align], className)}
      {...wrapperProps}
    >
      {label && (
        <ItemWrapper {...itemProps}>
          <h2 className="text-label mb-4">
            {label}
          </h2>
        </ItemWrapper>
      )}
      
      <ItemWrapper {...itemProps}>
        <h3 className="text-heading mb-4 md:mb-6">
          {title}
        </h3>
      </ItemWrapper>

      {subtitle && (
        <ItemWrapper {...itemProps}>
          {typeof subtitle === "string" ? (
            <p className="text-subheading">{subtitle}</p>
          ) : (
            subtitle
          )}
        </ItemWrapper>
      )}
    </ContentWrapper>
  );
}
