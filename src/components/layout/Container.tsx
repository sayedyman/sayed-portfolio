import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "editorial" | "full";
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16",
        {
          "max-w-7xl 2xl:max-w-[1440px]": size === "default",
          "max-w-3xl": size === "editorial",
          "max-w-full": size === "full",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
