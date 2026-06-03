import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'legacyMetadata', title: 'Legacy Metadata' },
    { name: 'ordering', title: 'Ordering & Visibility' },
    { name: 'caseStudy', title: 'Case Study' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    // ─── CONTENT ─────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('A project title is required'),
    }),

    defineField({
      name: 'behanceUrl',
      title: 'Behance URL',
      type: 'url',
      group: 'content',
      description: 'Direct link to the full case study on Behance.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Legacy field. No longer actively used in the frontend.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      hidden: true,
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
          { title: '⏳ Coming Soon', value: 'coming-soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
      hidden: true,
    }),

    defineField({
      name: 'projectTypeRef',
      title: 'Category / Project Type',
      type: 'reference',
      to: [{ type: 'projectType' }],
      group: 'content',
      description: 'The primary category of the project. Can be created inline.',
    }),

    defineField({
      name: 'projectType',
      title: 'Legacy Project Type',
      type: 'string',
      group: 'legacyMetadata',
      description: 'Legacy field. Use the Category / Project Type reference field instead.',
      hidden: true,
      readOnly: true,
    }),

    defineField({
      name: 'category',
      title: 'Category Label',
      type: 'string',
      group: 'legacyMetadata',
      description: 'Editorial subtitle shown on project cards (e.g. "UX Research & Design System")',
      hidden: true,
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'legacyMetadata',
      description: 'Flexible secondary descriptors (e.g. "Accessibility", "Design System")',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'legacyMetadata',
      rows: 3,
      description: 'Short description shown on project listing cards',
      hidden: true,
    }),

    defineField({
      name: 'teaserCopy',
      title: 'Teaser Copy',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Optional atmospheric line shown on the Coming Soon page. Keep it short and evocative — one or two sentences maximum.',
      hidden: true,
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Legacy field. Short editorial summary shown in the case study hero section',
      hidden: true,
    }),

    defineField({
      name: 'readingWidth',
      title: 'Reading Width',
      type: 'string',
      group: 'content',
      description: 'Optional. Controls the max-width of the case study body text for subtle editorial pacing.',
      options: {
        list: [
          { title: 'Narrow', value: 'narrow' },
          { title: 'Standard', value: 'standard' },
          { title: 'Wide', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
      hidden: true,
    }),

    // ─── MEDIA ───────────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers and SEO',
        }),
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule) => Rule.custom((value: any, context) => {
        const doc = context.document as { status?: string }
        if (doc?.status === 'published' && !value?.asset) {
          return 'Cover image is required before publishing'
        }
        return true
      }),
    }),

    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      description: 'Additional cinematic images for the case study — order controls presentation sequence',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
      hidden: true,
    }),

    defineField({
      name: 'imageGradient',
      title: 'Fallback Gradient',
      type: 'string',
      group: 'legacyMetadata',
      description: 'CSS gradient class string used when no cover image is set (e.g. "from-[#111] via-[#161616] to-[#050505]")',
      initialValue: 'from-[#111] via-[#161616] to-[#050505]',
      hidden: true,
    }),

    // ─── ORDERING & VISIBILITY ────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      group: 'ordering',
      description: 'When enabled, this project appears in the "Selected Work" section on the homepage',
      initialValue: false,
    }),

    defineField({
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      group: 'ordering',
      description: 'Homepage-specific display order — lower numbers appear first. Independent from global display order.',
      hidden: true,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'ordering',
      description: 'Global sort order on the /projects page — lower numbers appear first',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'ordering',
      description: 'Publication date — used for chronological sorting and newest-first ordering',
      hidden: true,
    }),

    defineField({
      name: 'launchDate',
      title: 'Expected Launch',
      type: 'date',
      group: 'ordering',
      description: 'Optional. Future-ready field for scheduled publishing, countdown systems, and release workflows. Not rendered on the frontend yet.',
      hidden: true,
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      group: 'ordering',
      description: 'Last updated date — used for activity-based sorting and future content systems',
      hidden: true,
    }),

    // ─── CASE STUDY ───────────────────────────────────────────────────
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'legacyMetadata',
      description: "Your role on this project (e.g. \"Lead Product Designer\")",
      hidden: true,
    }),

    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'legacyMetadata',
      description: 'Project duration (e.g. "12 Weeks")',
      hidden: true,
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'legacyMetadata',
      description: 'Client name or project context',
      hidden: true,
    }),

    defineField({
      name: 'body',
      title: 'Case Study Body',
      type: 'array',
      group: 'caseStudy',
      description: 'Full case study content — supports rich text with headings, images, and pull quotes',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
      hidden: true,
    }),

    // ─── SEO ─────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Custom <title> tag override — falls back to the project title if empty',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Meta description — falls back to the project summary if empty',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'coverImage',
      featured: 'featured',
      displayOrder: 'displayOrder',
    },
    prepare({ title, status, media, featured, displayOrder }) {
      const statusEmoji =
        status === 'published'    ? '✅'
        : status === 'archived'   ? '📦'
        : status === 'coming-soon'? '⏳'
        : '📝'
      const featuredBadge = featured ? ' ⭐' : ''
      const orderPrefix = displayOrder !== undefined ? `[${displayOrder}] ` : ''
      return {
        title: `${orderPrefix}${title}`,
        subtitle: `${statusEmoji} ${status}${featuredBadge}`,
        media,
      }
    },
  },
})
