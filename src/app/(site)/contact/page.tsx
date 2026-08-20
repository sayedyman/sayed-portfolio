"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { CtaButton } from "@/components/ui/CtaButton";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronDown, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [projectType, setProjectType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setIsSubmitting(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xwvyabyj", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setIsSubmitted(true);
      setSubmitError("");
      form.reset();
    } else {
      setSubmitError("Something went wrong. Please try again.");
    }
  } catch {
    setSubmitError("Something went wrong. Please check your connection and try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="relative min-h-[100svh] pt-20 md:pt-24 lg:pt-28 pb-24 overflow-hidden bg-background">
      {/* Background gradients for cinematic transition */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <Container className="relative z-10">
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            
            {/* Availability Status */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-12 mt-8 md:mt-12"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Available for freelance projects
              </span>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-[5.5rem] font-heading font-medium leading-[1] tracking-tighter uppercase mb-6">
                Let&apos;s Build <span className="text-foreground dark:text-white italic font-editorial">Something</span> Exceptional
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-16">
                Designing modern product experiences across dashboards, web platforms, and digital products. Focused on thoughtful UX and scalable design systems
              </p>
            </motion.div>
          </div>
        </Grid>

        <Grid className="relative">
          {/* Subtle separator */}
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-16 h-px w-full bg-gradient-to-r from-border/50 via-border/10 to-transparent" />

          {/* Contact Methods (Left Column) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-4 md:col-span-3 lg:col-span-4 flex flex-col gap-12 mb-16 md:mb-0"
          >
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-8">Contact Details</h3>
              <div className="flex flex-col gap-8">
                <a href="mailto:sayedelghanam123@gmail.com" className="group flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center bg-secondary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="pt-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Email</div>
                    <div className="text-lg font-medium group-hover:text-accent-text transition-colors">sayedelghanam123@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://wa.me/201099204491" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center bg-secondary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="pt-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">WhatsApp</div>
                    <div className="text-lg font-medium group-hover:text-accent-text transition-colors">+20 109 920 4491</div>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/sayed-ayman/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center bg-secondary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="pt-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">LinkedIn</div>
                    <div className="text-lg font-medium group-hover:text-accent-text transition-colors">Sayed Elghanam</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border/30 flex items-start">
              <CtaButton 
                variant="secondary" 
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </CtaButton>
            </div>
          </motion.div>

          {/* Contact Form (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-4 md:col-span-5 lg:col-span-7 lg:col-start-6 relative min-h-[550px]"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="bg-white/60 dark:bg-secondary/10 border border-black/5 dark:border-border/30 rounded-2xl p-8 md:p-12 backdrop-blur-[2px]"
                >
                  <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div className="space-y-3">
                      <label htmlFor="name" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Name</label>
                      <input 
                        type="text" 
                        id="name"
                          name="name" 
                        required
                        className="w-full bg-transparent border-b border-black/10 dark:border-border/50 px-0 py-3 text-foreground placeholder:text-black/40 dark:placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent-text transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        className="w-full bg-transparent border-b border-black/10 dark:border-border/50 px-0 py-3 text-foreground placeholder:text-black/40 dark:placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent-text transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div className="space-y-3">
                      <label htmlFor="type" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Project Type</label>
                      <div className="relative flex items-center" ref={dropdownRef}>
                        <input type="hidden" name="projectType" value={projectType} required />
                        <div 
                          className="w-full bg-transparent border-b border-black/10 dark:border-border/50 px-0 py-3 pr-8 text-foreground focus:outline-none focus:border-accent-text transition-colors cursor-pointer relative"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setIsDropdownOpen(!isDropdownOpen);
                            }
                          }}
                        >
                          <span className={projectType ? "text-foreground" : "text-black/40 dark:text-muted-foreground/30"}>
                            {projectType || "Select project type"}
                          </span>
                          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                        
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-border/50 rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
                            >
                              {["Web Design", "Mobile App Design", "Dashboard Design", "Landing Page Design", "UX Audit", "Other"].map((type) => (
                                <div
                                  key={type}
                                  className="px-4 py-3 text-sm text-foreground hover:bg-black/5 dark:hover:bg-primary/15 transition-colors cursor-pointer"
                                  onClick={() => {
                                    setProjectType(type);
                                    setIsDropdownOpen(false);
                                  }}
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      setProjectType(type);
                                      setIsDropdownOpen(false);
                                    }
                                  }}
                                >
                                  {type}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="budget" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Budget Range</label>
                      <input 
                        type="text" 
                        id="budget"
                        name="budget" 
                        className="w-full bg-transparent border-b border-black/10 dark:border-border/50 px-0 py-3 text-foreground placeholder:text-black/40 dark:placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent-text transition-colors"
                        placeholder="Type your budget here"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-14">
                    <label htmlFor="message" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Message</label>
                    <textarea 
                      id="message"
                      name="message" 
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-black/10 dark:border-border/50 px-0 py-3 text-foreground placeholder:text-black/40 dark:placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent-text transition-colors resize-none"
                      placeholder="Tell me about your vision..."
                    />
                  </div>

                  {submitError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-4 bg-destructive/5 border border-destructive/20 rounded-lg flex items-start gap-3 text-destructive"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{submitError}</p>
                    </motion.div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <p className="text-[11px] text-muted-foreground tracking-widest uppercase whitespace-nowrap">
                      Typically replies within 24 hours
                    </p>
                    <CtaButton
                      type="submit"
                      variant="primary"
                      size="md"
                      loading={isSubmitting}
                      className="whitespace-nowrap w-max"
                    >
                      Start Conversation
                    </CtaButton>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/60 dark:bg-secondary/5 border border-black/5 dark:border-border/20 rounded-2xl p-10"
                >
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                  <h4 className="text-4xl font-heading font-medium mb-6">Your message has been received</h4>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                    Thanks for reaching out. I’ve got your message and will review the details. I’ll get back to you as soon as possible.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </Grid>
      </Container>
    </div>
  );
}
