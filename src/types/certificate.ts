export type SanityCertificate = {
  _id: string
  _createdAt?: string
  _updatedAt?: string
  title: string
  issuer: string
  date?: string
  image?: {
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
  }
  certificateUrl?: string
  description?: string
  displayOrder?: number
}
