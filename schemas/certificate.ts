import { defineField, defineType } from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'ordering', title: 'Ordering & Visibility' },
  ],

  fields: [
    // ─── CONTENT ─────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Certificate Title',
      type: 'string',
      group: 'content',
      description: 'The full name of the certificate (e.g. "Google UX Design Professional Certificate")',
      validation: (Rule) => Rule.required().error('Certificate title is required'),
    }),

    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      group: 'content',
      description: 'Organization or platform (e.g. "Google / Coursera", "DEPI", "Interaction Design Foundation")',
      validation: (Rule) => Rule.required().error('Issuing organization is required'),
    }),

    defineField({
      name: 'date',
      title: 'Date / Year',
      type: 'string',
      group: 'content',
      description: 'Issuance date or year range (e.g. "2025", "Jan 2025", "2024–2025")',
    }),

    defineField({
      name: 'certificateUrl',
      title: 'Certificate URL / Verification Link',
      type: 'url',
      group: 'content',
      description: 'Direct link to verify or view the original credential online',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Optional brief summary of key competencies, topics, or achievements covered',
    }),

    // ─── MEDIA ───────────────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Certificate Image / Preview',
      type: 'image',
      group: 'media',
      description: 'High-resolution scan or preview image of the certificate',
      options: {
        hotspot: true,
      },
    }),

    // ─── ORDERING ────────────────────────────────────────────────────
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'ordering',
      description: 'Lower numbers appear first (e.g. 1, 2, 3...)',
      initialValue: 10,
    }),
  ],

  orderings: [
    {
      title: 'Display Order, then Newest',
      name: 'displayOrderAsc',
      by: [
        { field: 'displayOrder', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      issuer: 'issuer',
      date: 'date',
      media: 'image',
    },
    prepare({ title, issuer, date, media }) {
      const subtitle = [issuer, date].filter(Boolean).join(' • ')
      return {
        title: title || 'Untitled Certificate',
        subtitle: subtitle || 'No details',
        media,
      }
    },
  },
})
