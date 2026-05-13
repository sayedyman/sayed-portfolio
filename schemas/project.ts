import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'ordering', title: 'Ordering & Visibility' },
    { name: 'presentation', title: 'Presentation' },
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('A slug is required'),
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
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      group: 'content',
      description: 'Primary categorization — used for filtering on the projects page',
      options: {
        list: [
          { title: 'SaaS', value: 'SaaS' },
          { title: 'Mobile App', value: 'Mobile App' },
          { title: 'Dashboard', value: 'Dashboard' },
          { title: 'Landing Page', value: 'Landing Page' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'category',
      title: 'Category Label',
      type: 'string',
      group: 'content',
      description: 'Editorial subtitle shown on project cards (e.g. "UX Research & Design System")',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
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
      group: 'content',
      rows: 3,
      description: 'Short description shown on project listing cards',
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short editorial summary shown in the case study hero section',
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
    }),

    defineField({
      name: 'imageGradient',
      title: 'Fallback Gradient',
      type: 'string',
      group: 'media',
      description: 'CSS gradient class string used when no cover image is set (e.g. "from-[#111] via-[#161616] to-[#050505]")',
      initialValue: 'from-[#111] via-[#161616] to-[#050505]',
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
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      group: 'ordering',
      description: 'Last updated date — used for activity-based sorting and future content systems',
    }),

    // ─── PRESENTATION ─────────────────────────────────────────────────
    defineField({
      name: 'narrativeStyle',
      title: 'Narrative Style',
      type: 'string',
      group: 'presentation',
      description: 'Controls the storytelling rhythm and visual presentation of the case study page',
      options: {
        list: [
          {
            title: 'Minimal',
            value: 'minimal',
          },
          {
            title: 'Immersive',
            value: 'immersive',
          },
          {
            title: 'Visual Heavy',
            value: 'visual-heavy',
          },
          {
            title: 'Process Heavy',
            value: 'process-heavy',
          },
          {
            title: 'Editorial',
            value: 'editorial',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'editorial',
    }),

    defineField({
      name: 'align',
      title: 'Card Alignment',
      type: 'string',
      group: 'presentation',
      description: 'Layout alignment of this project card on the /projects listing page',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),

    // ─── CASE STUDY ───────────────────────────────────────────────────
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'caseStudy',
      description: "Your role on this project (e.g. \"Lead Product Designer\")",
    }),

    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'caseStudy',
      description: 'Project duration (e.g. "12 Weeks")',
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'caseStudy',
      description: 'Client name or project context',
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
      const statusEmoji = status === 'published' ? '✅' : status === 'archived' ? '📦' : '📝'
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
