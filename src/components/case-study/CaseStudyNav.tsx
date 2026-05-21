"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavItem {
  title: string;
  slug: string;
}

interface CaseStudyNavProps {
  next?: NavItem;
  prev?: NavItem;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudyNav({ next, prev }: CaseStudyNavProps) {
  return (
    <nav className="w-full">
      {/* Next project strip */}
      {next && (
        <Link href={`/projects/${next.slug}`} className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="border-t border-[#1e1e1e] py-10 flex items-center justify-between transition-colors duration-500 group-hover:bg-white/[0.02] px-0"
          >
            <div>
              <p className="font-editorial font-light text-[0.75rem] text-[#555555] mb-2 uppercase tracking-[0.2em]">
                Next
              </p>
              <p
                className="font-heading font-medium text-white leading-[1.1] tracking-tight group-hover:text-primary transition-colors duration-300"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
              >
                {next.title}
              </p>
            </div>
            <motion.div
              className="flex-shrink-0 ml-8"
              animate={{ x: 0 }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight
                className="text-[#555555] group-hover:text-primary transition-colors duration-300"
                size={28}
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
        </Link>
      )}

      {/* Back to work */}
      <div className="border-t border-[#1e1e1e] py-7">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 font-editorial text-[0.875rem] text-[#666666] hover:text-[#A0A0A0] transition-colors duration-300"
        >
          <motion.span
            className="inline-block"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
          </motion.span>
          Back to work
        </Link>
      </div>
    </nav>
  );
}
