import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useServicesParallax(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const parallaxYReverse = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return { parallaxY, parallaxYReverse };
}
