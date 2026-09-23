"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCertificate } from "@/types";

interface CertificatesGridProps {
  certificates: SanityCertificate[];
}

// Threshold in characters to determine if description exceeds the clamped preview
const DESCRIPTION_TRUNCATE_LENGTH = 120;

const emptySubscribe = () => () => {};

export function CertificatesGrid({ certificates }: CertificatesGridProps) {
  const [selectedCert, setSelectedCert] = useState<SanityCertificate | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const lenis = useLenis();

  // Close modal handler
  const closeModal = useCallback(() => {
    setSelectedCert(null);
  }, []);

  // Keyboard Escape listener & Scroll locking (Lenis + Body)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      lenis?.stop();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        lenis?.start();
        document.body.style.overflow = originalOverflow || "unset";
      };
    }
  }, [selectedCert, closeModal, lenis]);

  if (certificates.length === 0) {
    return (
      <div className="py-20 md:py-28 flex flex-col items-center justify-center text-center border border-dashed border-border/40 rounded-2xl bg-secondary/10 px-6">
        <div className="w-12 h-12 rounded-full bg-secondary/60 border border-border/50 flex items-center justify-center mb-6 text-muted-foreground">
          <Award className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-heading font-medium text-foreground mb-3">
          No Certificates Published Yet
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed mb-8">
          Certifications and credentials will appear here once published from the CMS.
        </p>
        <Link
          href="/#work"
          className="px-6 py-3 rounded-full border border-border/60 bg-secondary/40 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary/70 hover:border-primary/50 transition-all duration-300"
        >
          Explore Featured Work
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {certificates.map((cert) => {
          const hasLongDescription =
            !!cert.description && cert.description.trim().length > DESCRIPTION_TRUNCATE_LENGTH;

          return (
            <article
              key={cert._id}
              className="group flex flex-col justify-between rounded-xl border border-border/40 bg-secondary/15 hover:bg-secondary/30 hover:border-border/80 transition-all duration-300 p-5 md:p-6 h-full"
            >
              <div className="flex flex-col flex-1">
                {/* PREVIEW CONTAINER - Stable fixed aspect ratio, object-contain so certificates are never cropped */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black/40 border border-border/30 flex items-center justify-center p-3 mb-5 shrink-0">
                  {cert.image ? (
                    <Image
                      src={urlFor(cert.image).width(1000).quality(90).url()}
                      alt={`${cert.title} certificate issued by ${cert.issuer}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground/60 gap-2">
                      <Award className="w-8 h-8 stroke-[1.5]" />
                      <span className="text-[11px] font-mono uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                    </div>
                  )}
                </div>

                {/* METADATA: ISSUER & DATE */}
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 shrink-0">
                  <span className="truncate">{cert.issuer}</span>
                  {cert.date && (
                    <span className="text-foreground/80 shrink-0 font-medium">{cert.date}</span>
                  )}
                </div>

                {/* TITLE - Fixed minimum height ensures cards align regardless of 1-line or 2-line title */}
                <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground tracking-tight leading-snug mb-3 line-clamp-2 min-h-[3.25rem] group-hover:text-primary transition-colors">
                  {cert.title}
                </h2>

                {/* FIXED DESCRIPTION AREA - Line clamped to 3 lines with optional View More */}
                <div className="min-h-[4.75rem] flex flex-col justify-start mb-4">
                  {cert.description ? (
                    <>
                      <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                      {hasLongDescription && (
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-accent-text hover:text-primary transition-colors mt-2 text-left self-start inline-flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
                        >
                          View More
                        </button>
                      )}
                    </>
                  ) : null}
                </div>
              </div>

              {/* VIEW CERTIFICATE LINK / BUTTON */}
              <div className="pt-4 mt-auto border-t border-border/20 flex items-center justify-between shrink-0">
                {cert.certificateUrl ? (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${cert.title} certificate (opens in a new tab)`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    <span>View Certificate</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    Verified Credential
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* CERTIFICATE DETAILS MODAL (PORTALED TO DOCUMENT.BODY) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-cert-title"
                data-lenis-prevent
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 overscroll-contain"
              >
                {/* BACKDROP */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeModal}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md"
                />

                {/* MODAL DIALOG */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  data-lenis-prevent
                  className="relative z-10 w-full max-w-[calc(100vw-32px)] md:w-[1100px] md:max-w-[calc(100vw-64px)] max-h-[calc(100dvh-32px)] md:h-[780px] md:max-h-[calc(100vh-80px)] bg-background/95 border border-border/50 rounded-2xl shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row backdrop-blur-xl modal-scrollbar overscroll-contain"
                >
                  {/* CLOSE BUTTON */}
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close certificate details"
                    className="cursor-pointer absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-secondary/80 hover:bg-secondary border border-border/40 flex items-center justify-center text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* LEFT COLUMN: CERTIFICATE IMAGE PREVIEW (FIXED & FULL VISIBILITY) */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 bg-black/40 flex items-center justify-center relative min-h-[220px] sm:min-h-[280px] md:min-h-0 md:h-full shrink-0 border-b md:border-b-0 md:border-r border-border/20">
                    {selectedCert.image ? (
                      <div className="relative w-full h-[200px] sm:h-[260px] md:h-full flex items-center justify-center">
                        <Image
                          src={urlFor(selectedCert.image).width(1400).quality(95).url()}
                          alt={`${selectedCert.title} certificate`}
                          fill
                          sizes="(max-width: 768px) 100vw, 550px"
                          className="object-contain"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground/60 gap-3">
                        <Award className="w-12 h-12 stroke-[1.5]" />
                        <span className="text-xs font-mono uppercase tracking-wider">
                          {selectedCert.issuer}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN: FULL DETAILS & INDEPENDENTLY SCROLLABLE CONTENT */}
                  <div
                    data-lenis-prevent
                    className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-between md:overflow-y-auto md:h-full modal-scrollbar min-h-0 overscroll-contain"
                  >
                    <div className="pr-2 md:pr-4">
                      {/* ISSUER & DATE */}
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 pr-10">
                        <span className="text-accent-text">{selectedCert.issuer}</span>
                        {selectedCert.date && (
                          <>
                            <span className="text-border">•</span>
                            <span className="text-foreground/80">{selectedCert.date}</span>
                          </>
                        )}
                      </div>

                      {/* TITLE */}
                      <h2
                        id="modal-cert-title"
                        className="text-2xl md:text-3xl font-heading font-medium text-foreground tracking-tight leading-snug mb-5 pr-10"
                      >
                        {selectedCert.title}
                      </h2>

                      {/* FULL DESCRIPTION */}
                      {selectedCert.description && (
                        <div className="text-sm md:text-base text-muted-foreground/90 leading-relaxed mb-6 whitespace-pre-line">
                          {selectedCert.description}
                        </div>
                      )}
                    </div>

                    {/* MODAL FOOTER */}
                    <div className="pt-6 mt-6 border-t border-border/30 flex items-center justify-between shrink-0">
                      {selectedCert.certificateUrl ? (
                        <a
                          href={selectedCert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${selectedCert.title} certificate (opens in a new tab)`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          <span>View Certificate</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                          Verified Credential
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
