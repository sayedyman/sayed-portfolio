/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

async function run() {
  console.log('Fetching projects...')
  const projects = await client.fetch(`*[_type == "project" && defined(projectTypeRef)] {
    _id,
    "projectTypeTitle": projectTypeRef->title
  }`)

  console.log(`Found ${projects.length} projects to migrate.`)

  for (const project of projects) {
    if (project.projectTypeTitle) {
      console.log(`Updating project ${project._id} with projectType: ${project.projectTypeTitle}`)
      await client
        .patch(project._id)
        .set({ projectType: project.projectTypeTitle })
        .unset(['projectTypeRef'])
        .commit()
      console.log(`Success: ${project._id}`)
    } else {
      console.log(`Project ${project._id} has reference but no title. Unsetting reference.`)
      await client
        .patch(project._id)
        .unset(['projectTypeRef'])
        .commit()
    }
  }
  
  console.log('Migration complete.')
}

run().catch(console.error)
