"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/design-system/motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  labelClassName?: string;
  subtitleClassName?: string;
  animated?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  labelClassName,
  subtitleClassName,
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
      className={cn("flex flex-col", alignmentClasses[align], className)}
      {...wrapperProps}
    >
      {label && (
        <ItemWrapper {...itemProps}>
          <h2 className={cn("text-label mb-6 md:mb-8", labelClassName)}>
            {label}
          </h2>
        </ItemWrapper>
      )}
      
      <ItemWrapper {...itemProps}>
        <h3 className={cn("text-heading mb-8 md:mb-12", titleClassName)}>
          {title}
        </h3>
      </ItemWrapper>

      {subtitle && (
        <ItemWrapper {...itemProps}>
          {typeof subtitle === "string" ? (
            <p className={cn("text-subheading", subtitleClassName)}>{subtitle}</p>
          ) : (
            subtitle
          )}
        </ItemWrapper>
      )}
    </ContentWrapper>
  );
}
