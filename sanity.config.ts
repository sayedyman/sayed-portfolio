import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'sayed-portfolio',
  title: "Sayed's Portfolio CMS",

  projectId: 'sb63ac2i',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .child(
                S.documentList()
                  .title('All Projects')
                  .filter('_type == "project"')
                  .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
              ),
            // Scalable rendering for all other document types (e.g., Articles, Categories)
            ...S.documentTypeListItems().filter(
              (listItem) => !['project'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
