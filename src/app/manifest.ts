import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sayed Elghanam | UI/UX Designer',
    short_name: 'Sayed Elghanam',
    description:
      'UI/UX Designer crafting modern digital experiences and premium user-centered digital products.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
  }
}
