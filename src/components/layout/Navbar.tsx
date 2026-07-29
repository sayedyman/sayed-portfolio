"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "./Container";
import { useActiveSection } from "@/hooks/useActiveSection";

const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "afterChildren"
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.08
    }
  }
};

const linkVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const
    }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 18,
      mass: 0.8
    }
  }
};


export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();
  const { activeId, setManualActiveId } = useActiveSection([
    "home",
    "about",
    "work",
    "experience",
    "journal"
  ]);

  useEffect(() => {
    // mounted state removed as it is no longer needed
  }, []);

  // Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on route change
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Lock scrolling when drawer open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    if (href === "/" && pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.start();
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
        lenis.start();
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

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // 1. Execute navigation/scroll first
    handleScroll(e);
    
    // 2. Ensure scrolling is unlocked if it was locked by the drawer
    lenis?.start();

    // 3. Delay closing the menu slightly so navigation has priority
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Container>
          <div className={`pointer-events-auto relative mx-auto w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
            isScrolled 
              ? "mt-3 sm:mt-5 max-w-4xl bg-background/80 backdrop-blur-md border border-border/40 shadow-sm rounded-2xl py-2 px-4 sm:px-6" 
              : "mt-0 max-w-full pt-[max(env(safe-area-inset-top),1.5rem)] md:pt-[max(env(safe-area-inset-top),2rem)] pb-4 md:pb-6 lg:pb-8 px-0 bg-transparent border-transparent"
          }`}>
            <Link href="/" onClick={handleScroll} className="z-50 relative h-[36px] md:h-[48px] w-[140px] md:w-[180px] ml-2 md:ml-4 flex items-center justify-start group">
              <Image 
                src="/logo-symbol.svg" 
                alt="Sayed Elghanam Logo" 
                fill 
                className="object-contain object-left group-hover:scale-[1.03] group-hover:opacity-90 touch-active transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-md" 
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6 mix-blend-difference absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {[
                { name: "About", href: "/#about", id: "about" },
                { name: "Work", href: "/#work", id: "work" },
                { name: "Experience", href: "/#experience", id: "experience" },
                { name: "Journal", href: "/#journal", id: "journal" }
              ].map((link) => {
                const active = link.href === "/contact" ? pathname === "/contact" : (pathname === "/" && activeId === link.id);
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    onClick={(e) => {
                      handleScroll(e);
                      if (link.href === "/") setManualActiveId("home");
                      else if (link.href.startsWith("/#")) setManualActiveId(link.id);
                    }} 
                    className={`text-sm transition-all duration-300 touch-active hover:opacity-70 ${
                      active ? "text-primary font-bold" : "font-medium"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Only */}
            <div className="hidden md:flex items-center">
              <Link href="/contact" passHref>
                <MagneticButton variant="secondary" className="py-2.5 px-6 text-sm animate-idle-shimmer">
                  Hire Me
                </MagneticButton>
              </Link>
            </div>

            {/* Mobile Hamburger Trigger Dial */}
              <div className="flex md:hidden items-center z-50">
                <MagneticButton 
                  variant="secondary" 
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-11 h-11 p-0 rounded-full flex items-center justify-center animate-idle-shimmer"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <motion.span 
                      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                      className="absolute w-5 h-[1.5px] bg-foreground rounded-full"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.span 
                      animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                      className="absolute w-5 h-[1.5px] bg-foreground rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span 
                      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                      className="absolute w-5 h-[1.5px] bg-foreground rounded-full"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </MagneticButton>
              </div>
          </div>
        </Container>
      </motion.header>

      {/* Cinematic Fullscreen Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg border-b border-border/40 flex flex-col justify-between h-screen h-dvh overflow-x-hidden"
            >
              <div 
                onClick={() => setIsOpen(false)} 
                className="absolute inset-0 z-0 bg-transparent"
              />
              <div className="relative z-10 flex-1 flex flex-col justify-between pt-[calc(max(env(safe-area-inset-top),1.5rem)+5.5rem)] px-6 pb-[calc(max(env(safe-area-inset-bottom),2rem)+1.5rem)] overflow-y-auto w-full">
                <nav className="flex flex-col gap-8 mt-4">
                  {[
                    { name: "About", href: "/#about", id: "about" },
                    { name: "Work", href: "/#work", id: "work" },
                    { name: "Experience", href: "/#experience", id: "experience" },
                    { name: "Journal", href: "/#journal", id: "journal" }
                  ].map((link, idx) => {
                    const active = link.href === "/contact" ? pathname === "/contact" : (pathname === "/" && activeId === link.id);
                    return (
                    <motion.div key={link.name} variants={linkVariants}>
                      <Link 
                        href={link.href} 
                        onClick={(e) => {
                          handleMobileLinkClick(e);
                          if (link.href === "/") setManualActiveId("home");
                          else if (link.href.startsWith("/#")) setManualActiveId(link.id);
                        }}
                        className="group flex items-baseline gap-4 py-3 border-b border-border/5 touch-active"
                      >
                        <span className={`font-heading text-sm font-semibold tracking-widest transition-colors duration-300 ${active ? 'text-primary' : 'text-primary/50'}`}>0{idx + 1}</span>
                        <span className={`text-3xl font-heading tracking-tight uppercase group-hover:text-primary transition-all duration-300 ${active ? 'text-primary font-bold' : 'font-medium'}`}>
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  )})}
                </nav>

                <div className="flex flex-col gap-8 mt-12 w-full">
                  <motion.div variants={linkVariants} className="flex flex-col gap-4 w-full">
                    <Link href="/#work" passHref onClick={handleMobileLinkClick} className="w-full">
                      <MagneticButton className="w-full justify-center px-8 py-4 text-xs font-semibold tracking-widest uppercase touch-active">
                        View Projects
                      </MagneticButton>
                    </Link>
                    <Link href="/contact" passHref onClick={handleMobileLinkClick} className="w-full">
                      <MagneticButton variant="ghost" className="w-full justify-center px-8 py-4 text-xs font-semibold tracking-widest uppercase border border-border/50 touch-active">
                        Let&apos;s Work Together
                      </MagneticButton>
                    </Link>
                  </motion.div>

                  <motion.div 
                    variants={linkVariants} 
                    className="flex items-center justify-between border-t border-border/10 pt-6 text-[10px] font-medium text-muted-foreground uppercase tracking-[0.25em]"
                  >
                    {[
                      { name: "LinkedIn", href: "https://www.linkedin.com/in/sayed-ayman/" },
                      { name: "Behance", href: "https://www.behance.net/sayedelghanam1" },
                      { name: "GitHub", href: "https://github.com/sayedyman" }
                    ].map((social) => (
                      <a 
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}
