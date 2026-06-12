import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'author', title: 'Author' },
    { name: 'ordering', title: 'Ordering & Visibility' },
  ],

  fields: [
    // ─── CONTENT ─────────────────────────────────────────────────────
    defineField({
      name: 'displayQuote',
      title: 'Display Quote',
      type: 'text',
      group: 'content',
      rows: 4,
      description:
        'The curated, editorial version of the testimonial shown on the site. Keep it concise and impactful — 1–3 sentences.',
      validation: (Rule) => Rule.required().error('A display quote is required'),
    }),

    defineField({
      name: 'fullQuote',
      title: 'Full Quote',
      type: 'text',
      group: 'content',
      rows: 6,
      description:
        'The complete original testimonial. Stored for reference — not rendered in the UI.',
    }),

    // ─── AUTHOR ──────────────────────────────────────────────────────
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      group: 'author',
      description: 'Name or role of the person (e.g. "Startup Founder")',
      validation: (Rule) => Rule.required().error('Author name is required'),
    }),

    defineField({
      name: 'authorRole',
      title: 'Author Role',
      type: 'string',
      group: 'author',
      description: 'Optional title or position (e.g. "CEO & Co-founder")',
    }),

    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      group: 'author',
      description: 'Optional company or organization name',
    }),

    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      group: 'author',
      description:
        'Optional professional photo. If no real photo exists, leave empty — the section will use a typography-first layout instead.',
      options: {
        hotspot: true,
      },
    }),

    // ─── ORDERING & VISIBILITY ───────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      group: 'ordering',
      description:
        'When enabled, this testimonial appears in the Testimonials section on the homepage',
      initialValue: false,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'ordering',
      description: 'Sort order — lower numbers appear first',
    }),
  ],

  preview: {
    select: {
      quote: 'displayQuote',
      author: 'authorName',
      role: 'authorRole',
      featured: 'featured',
      media: 'avatar',
    },
    prepare({ quote, author, role, featured, media }) {
      const truncated = quote && quote.length > 60 ? `${quote.slice(0, 60)}…` : quote
      const featuredBadge = featured ? ' ⭐' : ''
      const subtitle = [author, role].filter(Boolean).join(' — ')
      return {
        title: `"${truncated}"`,
        subtitle: `${subtitle}${featuredBadge}`,
        media,
      }
    },
  },
})
