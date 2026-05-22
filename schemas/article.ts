import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'metadata', title: 'Metadata & Curation' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
      description: 'Used to sort articles chronologically.',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      description: 'A brief summary of the article for listing cards and SEO.',
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'media',
      description: 'Optional. If missing, the article will gracefully render a text-only header.',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'metadata',
      description: 'Primary category (e.g., "UX", "Typography"). Kept lightweight and separate from project taxonomy.',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'metadata',
      initialValue: false,
    }),

    defineField({
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      group: 'metadata',
      description: 'Used to rank/curate featured articles on the homepage.',
      hidden: ({ document }) => !document?.featured,
    }),

    defineField({
      name: 'isEssay',
      title: 'Longform Essay',
      type: 'boolean',
      group: 'metadata',
      description: 'Toggle for deep-research longform writing (future extensibility).',
      initialValue: false,
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection
      const statusIcon = status === 'published' ? '🟢' : status === 'archived' ? '🗄️' : '📝'
      return {
        title: title,
        subtitle: `${statusIcon} ${status.toUpperCase()} ${subtitle ? `— ${subtitle}` : ''}`,
        media,
      }
    },
  },
})
