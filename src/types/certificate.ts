import type { SanityImage } from './index'

export type SanityCertificate = {
  _id: string
  _createdAt?: string
  _updatedAt?: string
  title: string
  issuer: string
  date?: string
  image?: SanityImage | null
  certificateUrl?: string
  description?: string
  displayOrder?: number
}
