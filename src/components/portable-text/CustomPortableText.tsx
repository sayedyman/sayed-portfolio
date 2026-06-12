import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'
import { cn } from '@/lib/utils'
import type { PortableTextBlock } from '@portabletext/types'

// ─── Custom Portable Text Components ──────────────────────────────────────────

const customComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-heading font-medium tracking-tighter mt-16 mb-8 text-foreground leading-[1.05]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-heading font-medium tracking-tight mt-16 md:mt-20 mb-6 text-foreground leading-[1.1]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-heading font-medium tracking-tight mt-12 md:mt-16 mb-4 text-foreground leading-[1.2]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-heading font-medium tracking-tight mt-10 mb-4 text-foreground leading-[1.3]">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[1.0625rem] md:text-lg text-muted-foreground leading-[1.85] mb-8 md:mb-10 font-sans tracking-[0.01em]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative border-l-4 border-primary pl-6 md:pl-8 my-12 md:my-16 text-[1.375rem] md:text-[1.75rem] italic font-editorial text-foreground/90 bg-primary/5 py-8 pr-6 rounded-r-md leading-relaxed tracking-tight overflow-hidden">
        {/* Subtle decorative quote mark in background */}
        <span className="absolute -top-4 -left-2 text-[8rem] text-primary/10 font-serif leading-none select-none pointer-events-none" aria-hidden="true">
          &quot;
        </span>
        <div className="relative z-10">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-8 md:my-10 space-y-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside my-8 md:my-10 ml-6 md:ml-8 space-y-4 font-editorial text-[1.125rem] text-muted-foreground/80 marker:text-primary/70">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 md:pl-8 text-[1.0625rem] md:text-lg text-muted-foreground leading-[1.85] font-sans tracking-[0.01em]">
        <span className="absolute left-1 md:left-2 top-[0.6875em] w-1.5 h-1.5 rounded-full bg-primary/70" aria-hidden="true" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-2 text-[1.0625rem] md:text-lg text-muted-foreground leading-[1.85] font-sans tracking-[0.01em]">
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/90 font-editorial">{children}</em>
    ),
    highlight: ({ children }) => (
      <span className="text-[#FFE500]">
        {children}
      </span>
    ),
    accent: ({ children }) => (
      <span className="text-[#FFE500] font-medium">
        {children}
      </span>
    ),
    muted: ({ children }) => (
      <span className="text-muted-foreground/60">{children}</span>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-16 md:my-20">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-secondary">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-4 text-sm text-muted-foreground/70 tracking-wide text-center font-editorial italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    separator: () => (
      <hr className="my-16 md:my-24 border-t border-border/40 w-1/3 mx-auto" />
    ),
  },
}

// ─── Wrapper Component ────────────────────────────────────────────────────────

interface CustomPortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

export function CustomPortableText({ value, className }: CustomPortableTextProps) {
  return (
    <div className={cn(
      "mx-auto max-w-[70ch]",
      // Visually bind lists to their preceding headings without merging semantic blocks
      "[&>h1+ul]:-mt-4 [&>h1+ol]:-mt-4",
      "[&>h2+ul]:-mt-2 [&>h2+ol]:-mt-2",
      "[&>h3+ul]:-mt-2 [&>h3+ol]:-mt-2",
      "[&>h4+ul]:-mt-2 [&>h4+ol]:-mt-2",
      className
    )}>
      <PortableText value={value} components={customComponents} />
    </div>
  )
}
