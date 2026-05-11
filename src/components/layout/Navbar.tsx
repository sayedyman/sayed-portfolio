"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "lenis/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "./Container";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    const previous = scrollY.getPrevious();
    if (previous === undefined) return;
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    if (href === "/" && pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { offset: 0, duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const target = href.replace("/", "");
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.5 });
      } else {
        const element = document.querySelector(target);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? "py-4 bg-background/70 backdrop-blur-md border-b border-border/40 shadow-sm" 
          : "py-6 bg-transparent border-b border-transparent shadow-none"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" onClick={handleScroll} className="z-50 relative h-[36px] md:h-[48px] w-[140px] md:w-[180px] ml-2 md:ml-4 flex items-center justify-start group">
            <Image 
              src="/logo-symbol.svg" 
              alt="Sayed Elghanam Logo" 
              fill 
              className="object-contain object-left group-hover:scale-[1.03] group-hover:opacity-90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-md" 
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 mix-blend-difference">
            <Link href="/#work" onClick={handleScroll} className="text-sm font-medium hover:opacity-70 transition-opacity">Work</Link>
            <Link href="/#about" onClick={handleScroll} className="text-sm font-medium hover:opacity-70 transition-opacity">About</Link>
            <Link href="/#experience" onClick={handleScroll} className="text-sm font-medium hover:opacity-70 transition-opacity">Experience</Link>
            <Link href="/#journal" onClick={handleScroll} className="text-sm font-medium hover:opacity-70 transition-opacity">Journal</Link>
          </nav>

          <div className="flex items-center">
            <Link href="/contact" passHref>
              <MagneticButton variant="primary" className="py-2.5 px-6 text-sm">
                Hire Me
              </MagneticButton>
            </Link>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
