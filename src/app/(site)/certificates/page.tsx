import { getAllCertificates } from '@/lib/sanity/queries'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { CertificatesGrid } from './CertificatesGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certificates & Credentials',
  description: 'A collection of certifications and learning milestones from the design journey of Sayed Ayman Elghanam.',
  alternates: { canonical: '/certificates' },
  openGraph: {
    title: 'Certificates & Credentials | Sayed Elghanam',
    description: 'A collection of certifications and learning milestones from the design journey of Sayed Ayman Elghanam.',
    url: 'https://sayed-portfolio-seven.vercel.app/certificates',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certificates & Credentials | Sayed Elghanam',
    description: 'A collection of certifications and learning milestones from the design journey of Sayed Ayman Elghanam.',
    images: ['/og-image.png'],
  },
}

// Re-fetch from Sanity every 60 s — fallback in case the webhook isn’t fired.
export const revalidate = 60

/**
 * Server Component — fetches all published certificates from Sanity
 * and delegates interactive grid & modal rendering to CertificatesGrid.
 */
export default async function CertificatesPage() {
  const certificates = await getAllCertificates()

  return (
    <div className="relative min-h-[100dvh] pt-32 pb-24 overflow-hidden bg-background">
      <Container className="relative z-10">
        {/* HERO SECTION */}
        <Grid className="mb-14 md:mb-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-8 md:mt-16">
            <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-heading font-medium leading-[0.95] tracking-tighter uppercase text-foreground mb-6">
              Certificates
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              A collection of certifications and learning milestones from my design journey.
            </p>
          </div>
        </Grid>

        {/* CERTIFICATES GRID (Equal height cards + View More Modal) */}
        <CertificatesGrid certificates={certificates} />
      </Container>
    </div>
  )
}

