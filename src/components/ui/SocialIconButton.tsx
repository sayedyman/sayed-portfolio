"use client";

import React from "react";

export interface SocialIconButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: React.ComponentType<{ className?: string; stroke?: number | string }>;
  label: string;
  className?: string;
}

export function SocialIconButton({
  href,
  icon: Icon,
  label,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: SocialIconButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/80 dark:border-white/10 bg-foreground/[0.03] dark:bg-white/[0.04] hover:bg-primary/10 dark:hover:bg-primary/10 text-muted-foreground hover:text-primary hover:border-primary/60 dark:hover:border-primary/60 transition-all duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-active ${className}`}
      {...props}
    >
      <Icon className="w-4 h-4 stroke-[1.5] transition-colors duration-200" />
    </a>
  );
}
